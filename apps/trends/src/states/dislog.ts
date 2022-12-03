import create from "zustand"
import { devtools } from "zustand/middleware"

interface DialogConfig {
  title: string
  description: string
  cancelText?: string
  confirmText?: string
  onClose?(): void
  onConfirm?(): void
  mode?: 'OK' | 'OK_CANCEL'
}

interface DialogState {
  visible: boolean,
  config: DialogConfig | null,
  open(config: DialogConfig): void,
  close(): void,
}

export const useDialogStore = create<DialogState>()(
  devtools((set) => ({
    visible: false,
    config: null,
    open: (config: DialogConfig) => {
      set({ visible: true, config })
    },
    close: () => {
      set({ visible: false, config: null })
    }
  }))
)

export function useDialogActions() {
  const open = useDialogStore((state) => state.open)
  const close = useDialogStore((state) => state.close)
  return { open, close }
}

export function useDialogValue() {
  const visible = useDialogStore((state) => state.visible)
  const config = useDialogStore((state) => state.config)
  return { visible, config }
}

export function useOpenDialog() {
  const { open } = useDialogActions()
  return open
}
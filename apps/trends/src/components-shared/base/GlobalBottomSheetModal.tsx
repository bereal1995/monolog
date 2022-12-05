import BottomSheetModal from '../system/BottomSheetModal'

import { useBottomSheetModalActions, useBottomSheetModalValue } from '@/states/bottomSheetModal'

function GlobalBottomSheetModal() {
  const { visible, items } = useBottomSheetModalValue()
  const { close } = useBottomSheetModalActions()
  return <BottomSheetModal items={items} visible={visible} onClose={close} />
}

export default GlobalBottomSheetModal

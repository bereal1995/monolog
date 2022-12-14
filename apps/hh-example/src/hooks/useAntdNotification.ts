import { notification } from 'antd'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export default function useAntdNotification() {
  const [api, contextHolder] = notification.useNotification()

  const openNotification = ({
    type = 'error',
    message,
    description,
  }: {
    type?: NotificationType
    message: string
    description: string
  }) => {
    api[type]({
      message,
      description,
    })
  }

  return {
    openNotification,
    contextHolder,
  }
}

import { App } from 'antd'

const useAppAntD = () => {
  const { message, notification } = App.useApp()

  return {
    message,
    notification
  }
}

export default useAppAntD

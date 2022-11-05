import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/index'

const createMessage = (options) => {
  ElMessage(options)
}

const createSuccessMessage = (msg: string) => {
  ElMessage.success(msg)
}

const createWarnMessage = (msg: string) => {
  ElMessage.warning(msg)
}

const createInfoMessage = (msg: string) => {
  const options = {
    type: 'info',
    message: msg,
  }
  createMessage(options)
}

const createErrorMessage = (msg: string) => {
  ElMessage.error(msg)
}

export function useMessage() {
  return {
    createMessage,
    createSuccessMessage,
    createWarnMessage,
    createInfoMessage,
    createErrorMessage,
  }
}

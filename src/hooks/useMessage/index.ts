import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/index'

const createSuccessMessage = (msg: string) => {
  return ElMessage.success(msg)
}

const createErrorMessage = (msg: string) => {
  return ElMessage.error(msg)
}

export function useMessage() {
  return {
    createSuccessMessage,
    createErrorMessage,
  }
}

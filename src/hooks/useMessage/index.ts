import { ElMessage, ElMessageBox } from 'element-plus'
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

// function renderContent({ content }) {
//   if (isString(content)) {
//     return <div innerHTML={`<div>${content as string}</div>`}></div>;
//   } else {
//     return content;
//   }
// }

const createMessageBox = (options, successFn, errorFn) => {
  const {
    title,
    message,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
  } = options
  ElMessageBox({
    title,
    message,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
  }).then(() => {
    successFn()
  }).catch(() => {
    errorFn()
  })
}

export function useMessage() {
  return {
    createMessage,
    createSuccessMessage,
    createWarnMessage,
    createInfoMessage,
    createErrorMessage,
    createMessageBox,
  }
}

export function resultSuccess(data: Object, message = 'success') {
  return {
    code: 200,
    data,
    message,
    type: 'success',
  }
}

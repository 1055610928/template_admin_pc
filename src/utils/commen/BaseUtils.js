import { Message } from 'element-ui'
// 消息提示，路由返回
export function messageTipAndRouterBack(message, callback) {
  Message({
    message: message,
    type: 'success'
  })
  callback()
}

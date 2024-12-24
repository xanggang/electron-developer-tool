/* eslint-disable no-console */
import { message } from 'ant-design-vue'

export default async function request<T>(channel: string, ...par: any): Promise<T> {
  console.info(`${channel}请求开始`, par)
  const res = await window.ipcRenderer.invoke(channel, ...par)
  console.info(`${channel}请求结束`, res)
  if (res.state === 1) {
    return res.message as T
  }
  message.error(res.errorMsg)
  return Promise.reject(res.errorMsg)
}

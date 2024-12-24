import request from '@/utils/IPCUtil'

export async function openFolder(path: string) {
  return request('openFolder', path)
}

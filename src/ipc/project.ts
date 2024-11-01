
// 打开弹窗， 获取一个文件的位置
export async function getFilePath() {
  const res = await window.ipcRenderer.invoke('getFilePath', 'D:\\')
  return res
}

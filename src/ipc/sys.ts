// 最小化
export function ipcMinWindow() {
  window.ipcRenderer.send('handMinWindow', { skipTaskBar: false })
}

// 打开配置文件目录
export function ipcOpenDbFile() {
  window.ipcRenderer.send('openDbFile')
}

// 打开配置文件目录
export function ipcCloseApp() {
  window.ipcRenderer.send('closeApp')
}

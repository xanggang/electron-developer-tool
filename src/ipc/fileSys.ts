export async function openFolder(path: string) {
  console.log(1)
  const res = await window.ipcRenderer.invoke('openFolder', path)
  return res
}

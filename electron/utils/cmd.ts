// const { exec } = require('child_process');
import { exec } from 'child_process'

const { platform } = process

export function execCommand(text: string) {
  let command
  if (platform === 'win32') {
    command = 'start "" ' // Windows下打开记事本
  } else if (platform === 'darwin') {
    command = 'open ' // macOS下打开终端
  } else if (platform === 'linux') {
    command = 'xdg-open ' // Linux下打开文件管理器
  }

  command += text

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        reject(error)
        return
      }
      resolve({
        stdout,
        stderr,
      })
      console.log(`运行cmd命令${command}, 结果stdout: ${stdout}`)
      console.error(`运行cmd命令${command}, 结果stderr: ${stderr}`)
    })
  })
}

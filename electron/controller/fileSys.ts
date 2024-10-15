import { ipc } from '../decorator/ipc'
import { dialog, shell } from 'electron'
import fs from 'node:fs'
import { writeFile } from 'node:fs/promises'
import type { IpcMainInvokeEvent } from 'electron'
import { WriteFileOptions } from 'fs'

// 文件系统相关
export class FileController {

  /**
   * 打开指定的文件夹
   * @param _event
   * @param folderPath
   */
  @ipc
  static openFolder(_event: IpcMainInvokeEvent, folderPath: string) {
    console.log('folderPath', folderPath)
    // 检查路径是否存在
    if (fs.existsSync(folderPath)) {
      console.log(1)
      // 使用 shell 模块打开文件夹
      shell.openPath(folderPath);
    } else {
      console.log(2)
      console.log('指定的文件夹不存在:', folderPath);
    }
  }

  /**
   * 获取指定文件夹的位置
   */
  @ipc
  static async getFilePath () {
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    if (!canceled) {
      return filePaths[0]
    }
    return ''
  }

  /**
   * 写文件， 同步方法
   * @param _event
   * @param filePath 文件保存路径
   * @param fileContent 文件内容
   * @param options encoding <string> | <null> 默认值：'utf8'
   *
   * mode <integer> 默认值：0o666
   *
   * flag <string> 参见 支持文件系统 flags。默认值：'w'。
   *
   * flush <boolean> 如果所有数据都成功写入文件，并且 flush 是 true，则使用 fs.fsyncSync() 来刷新数据。
   */
  @ipc
  static writeFileAsync(_event: IpcMainInvokeEvent, filePath, fileContent, options?: WriteFileOptions) {
    fs.writeFileSync(filePath, fileContent, options)
  }

  /**
   * 异步写文件
   * @param _event
   * @param filePath
   * @param fileContent
   * @param options
   */
  @ipc
  static async writeFileByPath(_event, filePath, fileContent, options?: WriteFileOptions) {
    return writeFile(filePath, fileContent, options)
      .then(res => ({ success: true }))
  }
}

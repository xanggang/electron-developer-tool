import { dialog, shell } from 'electron'
import fs from 'node:fs'
import path from 'node:path'
import { writeFile } from 'node:fs/promises'
import { WriteFileOptions } from 'fs'
import { mkdirp } from 'mkdirp'
import { execCommand } from '../utils/cmd'
import { getAppConfig, getSysConfigPath } from '../conf'
import { handle, on } from '../decorator/ipc'
import logger from '../common/logger'

// 文件系统相关
export class FileController {
  /**
   * 打开指定的文件夹
   * @param folderPath
   */
  @handle
  static openFolder(folderPath: string) {
    // 检查路径是否存在
    if (fs.existsSync(folderPath)) {
      // 使用 shell 模块打开文件夹
      shell.openPath(folderPath)
    } else {
      logger.warn(`指定的文件夹不存在:${folderPath}`)
    }
  }

  /**
   * 获取指定文件的位置
   */
  @handle
  static async getFilePath() {
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    if (!canceled) {
      return filePaths[0]
    }
    return ''
  }

  /**
   * 获取指定文件夹的位置
   */
  @handle
  static async getFolderPath() {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    })
    if (!canceled) {
      return filePaths[0]
    }
    return ''
  }

  /**
   * 写文件， 同步方法
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
  @handle
  static writeFileAsync(filePath, fileContent, options?: WriteFileOptions) {
    fs.writeFileSync(filePath, fileContent, options)
  }

  /**
   * 异步写文件
   * @param filePath
   * @param fileContent
   * @param options
   */
  @handle
  static async writeFileByPath(filePath, fileContent, options?: WriteFileOptions) {
    return writeFile(filePath, fileContent, options)
      .then((res) => ({ success: true }))
  }

  /**
   * 使用idea打开指定文件夹
   */
  @handle
  static async openProject() {
    const ideaPath = 'E:\\app\\WebStorm 2023.2.5\\bin\\webstorm64.exe'
    const projectPath = 'E:\\www\\my\\guge'
    const res = await execCommand(`"${ideaPath}" "${projectPath}"`)
    // E:\app\WebStorm 2023.2.5\bin
  }

  /**
   * 创建项目整个的文件地址
   * projectName
   */
  @handle
  static async createFileSys(projectName: string) {
    console.log(projectName)
    const config = await getAppConfig()
    const { projectRoot } = config
    console.log(projectRoot)
    const projectPath = path.join(projectRoot, projectName)
    if (fs.existsSync(projectPath)) {
      dialog.showMessageBoxSync({
        message: `${projectName}该项目已存在， 不可创建`,
      })
      logger.info(`${projectName}该项目已存在， 不可创建`)
      throw new Error('该项目已存在， 不可创建！')
    }

    const homePath = path.join(projectPath, '/home')
    const designPath = path.join(projectPath, '/design')
    const taskPath = path.join(projectPath, '/task')

    try {
      logger.info(`创建${homePath}文件夹`)
      logger.info(`创建${designPath}文件夹`)
      logger.info(`创建${taskPath}文件夹`)
      mkdirp(homePath)
      mkdirp(designPath)
      mkdirp(taskPath)
    } catch (e) {
      logger.error(e)
      throw new Error(e)
    }
  }

  /**
   * 读取本地文件返回给前端展示
   */
  @handle
  static async getLocalImage(imagePath: string) {
    try {
      const imageBuffer = await fs.promises.readFile(imagePath)
      return imageBuffer
    } catch (error) {
      console.error('Error reading image file:', error)
      throw error
    }
  }

  /**
   * 打开数据库所在文件夹
   */
  @on
  static async openDbFile() {
    const path = getSysConfigPath()
    console.log('folderPath', path)
    // 检查路径是否存在
    if (fs.existsSync(path)) {
      // 使用 shell 模块打开文件夹
      shell.openPath(path)
    } else {
      console.log('指定的文件夹不存在:', path)
    }
  }
}

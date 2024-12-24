import { dialog, shell } from 'electron'
import fs from 'node:fs'
import path from 'node:path'
import { writeFile } from 'node:fs/promises'
import { WriteFileOptions } from 'fs'
import { mkdirp } from 'mkdirp'
import { getAppConfig, getSysConfigPath } from '../conf'
import { handle, on } from '../decorator/ipc'
import logger from '../common/logger'
import Payload from '../common/payload'

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
    return Payload.success(true)
  }

  /**
   * 获取指定文件的位置
   */
  @handle
  static async getFilePath() {
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    if (!canceled) {
      return Payload.success(filePaths[0])
    }
    return Payload.success('')
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
      return Payload.success(filePaths[0])
    }
    return Payload.success('')
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
  static writeFileAsync(filePath: string, fileContent:any, options?: WriteFileOptions) {
    fs.writeFileSync(filePath, fileContent, options)
    return Payload.success(true)
  }

  /**
   * 异步写文件
   * @param filePath
   * @param fileContent
   * @param options
   */
  @handle
  static async writeFileByPath(filePath: string | string[], fileContent:any, options?: WriteFileOptions) {
    const pathString = Array.isArray(filePath)
      ? path.join(...filePath)
      : filePath
    await writeFile(pathString, fileContent, options)
    return Payload.success(true)
  }

  /**
   * 创建项目整个的文件地址
   * projectName
   */
  @handle
  static async createFileSys(projectName: string) {
    const config = await getAppConfig()
    const { projectRoot } = config
    const projectPath = path.join(projectRoot!, projectName)
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
      return Payload.success(true)
    } catch (e) {
      logger.error(e)
      throw new Error(e as string)
    }
  }

  /**
   * 读取本地文件返回给前端展示
   */
  @handle
  static async getLocalImage(imagePath: string) {
    try {
      const imageBuffer = await fs.promises.readFile(imagePath)
      return Payload.success(imageBuffer)
    } catch (error) {
      console.error('Error reading image file:', error)
      throw error
    }
  }

  /**
   * 读取目录下的某个文件
   */
  @handle
  static async getLocalFile({ fileName, folderPath }: {
    folderPath: string
    fileName: string
  }) {
    const filePath = path.join(folderPath, fileName)
    if (!fs.existsSync(filePath)) {
      return Payload.error('文件不存在')
    }
    try {
      const imageBuffer = await fs.promises.readFile(filePath, 'utf8')
      return Payload.success(imageBuffer)
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
    const filePath = getSysConfigPath()
    // 检查路径是否存在
    if (fs.existsSync(filePath)) {
      // 使用 shell 模块打开文件夹
      shell.openPath(filePath)
      return Payload.success(true)
    }
    console.warn('指定的文件夹不存在:', path)
  }
}

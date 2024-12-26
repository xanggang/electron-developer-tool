import logger from 'electron-log'
import dayjs from 'dayjs'
import path from 'path'
import { app } from 'electron'
import fs from 'fs/promises'
import { rimraf } from 'rimraf'

export async function initLogger() {
  logger.transports.file.level = 'debug'
  logger.transports.file.maxSize = 30 * 1024 * 1024 // 最大不超过10M
  logger.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}' // 设置文件内容格式

  const date = dayjs().format('YYYY-MM-DD') // 格式化日期为 yyyy-mm-dd

  logger.transports.file.fileName = `${date}.log` // 创建文件名格式为 '时间.log' (2023-02-01.log)

  const logsPath = path.resolve(app.getPath('userData'), 'log')

  try {
    const res = await fs.stat(logsPath)
    if (!res.isDirectory()) {
      await rimraf(logsPath)
      throw new Error()
    }
  } catch {
    await fs.mkdir(logsPath, {
      recursive: true,
    })
  }

  const resolvePathFn = path.resolve(logsPath, `${date}.log`)

  // eslint-disable-next-line no-console
  console.log('logsPath-------------****-----------', resolvePathFn) // 获取到安装目录的文件夹名称

  // 指定日志文件夹位置
  logger.transports.file.resolvePathFn = () => resolvePathFn
}

// 有六个日志级别error, warn, info, verbose, debug, silly。默认是silly
export default {
  info(...param: any[]) {
    logger.info(param)
  },
  warn(...param: any[]) {
    logger.warn(param)
  },
  error(...param: any[]) {
    logger.error(param)
  },
  debug(...param: any[]) {
    logger.debug(param)
  },
  verbose(...param: any[]) {
    logger.verbose(param)
  },
  silly(...param: any[]) {
    logger.silly(param)
  },
}

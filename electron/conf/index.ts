import path from 'path'
import { app } from 'electron'
import fs from 'fs/promises'
import { rimraf } from 'rimraf'
import { IAppConfig } from './type'
import { defaultConfig } from './default'


// 存放配置文件的地址
let _configPath: string

export function getSysConfigPath() {
  return app.getPath('userData')
}

// 获取配置文件地址
export function getConfigPath() {
  if (!_configPath) {
    _configPath = path.resolve(app.getPath('userData'), 'config.json')
  }
  return _configPath
}

// 数据库所在文件夹
export function getDbPath() {
  return path.resolve(app.getPath('userData'), 'data.db')
}


let cacheConfig: IAppConfig = null

// 校验配置文件， 如果没有就创建一个
async function checkPath() {
  // 路径:
  const configDirPath = app.getPath('userData')
  try {
    const res = await fs.stat(configDirPath)
    if (!res.isDirectory()) {
      await rimraf(configDirPath)
      throw new Error()
    }
  } catch {
    fs.mkdir(configDirPath, {
      recursive: true,
    })
  }

  try {
    const res = await fs.stat(getConfigPath())
    if (!res.isFile()) {
      await rimraf(getConfigPath())
      throw new Error()
    }
  } catch {
    fs.writeFile(getConfigPath(), '{}', 'utf-8')
    cacheConfig = {}
  }
}

// 获取系统配置
export async function getAppConfig(): Promise<IAppConfig> {
  try {
    if (cacheConfig) {
      return cacheConfig
    } else {
      const rawConfig = await fs.readFile(getConfigPath(), 'utf8')
      const rawJson = JSON.parse(rawConfig)
      cacheConfig = rawJson
    }
  } catch (e) {
    if (e.message === 'Unexpected end of JSON input' || e.code === 'EISDIR') {
      // JSON 解析异常 / 非文件
      await rimraf(getConfigPath())
      await checkPath()
    } else if (e.code === 'ENOENT') {
      // 文件不存在
      await checkPath()
    }
    cacheConfig = {}
  }
  return cacheConfig
}

// 设置系统配置
export async function setAppConfig(
  appConfig: IAppConfig,
  retryTime = 1
): Promise<boolean> {

  try {
    const rawConfig = JSON.stringify(appConfig, undefined, 4)
    await fs.writeFile(getConfigPath(), rawConfig, 'utf8')
    cacheConfig = appConfig

    return true
  } catch (e) {
    console.log('SET CONFIG FAIL', e)
    if (retryTime > 0) {
      if (e.code === 'EISDIR') {
        // 非文件
        await rimraf(getConfigPath())
        await checkPath()
        return setAppConfig(appConfig, retryTime - 1)
      }
    }
    return false
  }
}

// 初始化配置相关
export async function setupMainAppConfig() {
  await checkPath()
  const config = await getAppConfig()
  if (!config) {
    await setAppConfig(defaultConfig)
  }
}

// 修改部分配置
export async function setAppConfigPath(config: IAppConfig): Promise<boolean> {
  const newConfig = Object.assign({}, config)
  return setAppConfig(newConfig)
}

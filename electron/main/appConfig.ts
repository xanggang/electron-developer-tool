import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// preload文件
export const PRELOAD_URL = path.join(__dirname, '../preload/index.mjs')

export const APP_ROOT = path.join(__dirname, '../..')

// 编译后输出的文件
export const RENDERER_DIST = path.join(APP_ROOT, 'dist')
// 编译后输出的文件
export const MAIN_DIST = path.join(APP_ROOT, 'dist-electron')

// html入口文件
export const INDEX_HTML = path.join(RENDERER_DIST, 'index.html')

// export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL
//
// process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
//   ? path.join(process.env.APP_ROOT, 'public')
//   : RENDERER_DIST

// 开发环境注入的值， 启动的地址
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

export const VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(APP_ROOT, 'public')
  : RENDERER_DIST

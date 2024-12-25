/* eslint-disable no-console */
import fs from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import electron from 'vite-plugin-electron/simple'
import path from 'path'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  fs.rmSync('dist-electron', { recursive: true, force: true })

  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const isAppStarted = mode !== 'web'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG

  if (!isAppStarted) {
    console.log('以web模式启动')
  }

  return {
    plugins: [
      vue(),
      vueJsx(),
      Unocss({ /* options */ }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: true, // or a custom path
      }),
      ...(isAppStarted
        ? [electron({
          main: {
            // Shortcut of `build.lib.entry`
            entry: 'electron/main/index.ts',
            onstart({ startup }) {
              if (process.env.VSCODE_DEBUG) {
                console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App')
              } else {
                startup()
              }
            },
            vite: {
              build: {
                sourcemap,
                minify: isBuild,
                outDir: 'dist-electron/main',
                rollupOptions: {
                  // Some third-party Node.js libraries may not be built correctly by Vite, especially `C/C++` addons,
                  // we can use `external` to exclude them to ensure they work correctly.
                  // Others need to put them in `dependencies` to ensure they are collected into `app.asar` after the app is built.
                  // Of course, this is not absolute, just this way is relatively simple. :)
                  external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
                },
              },
            },
          },
          preload: {
            // Shortcut of `build.rollupOptions.input`.
            // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
            input: 'electron/preload/index.ts',
            vite: {
              build: {
                sourcemap: sourcemap ? 'inline' : undefined, // #332
                minify: isBuild,
                outDir: 'dist-electron/preload',
                rollupOptions: {
                  external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
                },
              },
            },
          },
          // Ployfill the Electron and Node.js API for Renderer process.
          // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
          // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
          renderer: {},
        })]
        : []),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, './src') },
        { find: '#vo', replacement: path.resolve(__dirname, './Vo') },
      ],
    },
    server: process.env.VSCODE_DEBUG && (() => {
      const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
      return {
        host: url.hostname,
        port: +url.port,
      }
    })(),
    esbuild: {
      target: 'es2022',
    },
    clearScreen: false,
  }
})

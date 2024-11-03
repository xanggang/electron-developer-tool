import { protocol, net  } from 'electron'
import url from 'node:url'
import fs from 'fs/promises'
import path from 'node:path'


export function registerFileProtocol() {
  protocol.registerSchemesAsPrivileged([
    {
      scheme: 'app',
      privileges: {
        secure: true,
        supportFetchAPI: true,
        standard: true,
        bypassCSP: true,
        stream: true,
      }
    }
  ])
}

export function setupFileProtocol() {
  // protocol.handle('app', (request) => {
  //   const filePath = request.url.slice('atom://'.length)
  //   return net.fetch(url.pathToFileURL(path.join(__dirname, filePath)).toString())
  // })
  //
  protocol.handle('app', (request) => {
    const { host, pathname } = new URL(request.url)
    return net.fetch(`file://${host}:${pathname}`); // file:///D:/2.png
  })

}

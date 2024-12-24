import { protocol, net } from 'electron'

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
      },
    },
  ])
}

export function setupFileProtocol() {
  protocol.handle('app', (request) => {
    const { host, pathname } = new URL(request.url)
    return net.fetch(`file://${host}:${pathname}`) // file:///D:/2.png
  })
}

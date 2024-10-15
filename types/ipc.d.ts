export interface IElectronAPI {
  loadPreferences: () => Promise<void>,
  invoke: () => Promise<void>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}

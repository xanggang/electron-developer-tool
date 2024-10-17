import { ipc } from '../decorator/ipc'
import { IAppConfig } from '../conf/type'
import { getAppConfig, setAppConfig, setAppConfigPath } from '../conf'

export default class ConfigController {

  @ipc
  static async getAppConfig(): Promise<IAppConfig> {
    return getAppConfig()
  }

  @ipc
  static async setAppConfig(_event, config: IAppConfig) {
    return setAppConfig(config)
  }

  @ipc
  static async setAppConfigPath(_event, config: IAppConfig) {
    return setAppConfigPath(config)
  }

}

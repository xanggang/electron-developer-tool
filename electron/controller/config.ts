import { handle } from '../decorator/ipc'
import { IAppConfig } from '../conf/type'
import { getAppConfig, setAppConfig, setAppConfigPath } from '../conf'

export default class ConfigController {

  @handle
  static async getAppConfig(): Promise<IAppConfig> {
    return getAppConfig()
  }

  @handle
  static async setAppConfig(onfig: IAppConfig) {
    return setAppConfig(onfig)
  }

  @handle
  static async setAppConfigPath(config: IAppConfig) {
    return setAppConfigPath(config)
  }

}

import { handle } from '../decorator/ipc'
import { IAppConfig } from '../conf/type'
import { getAppConfig, setAppConfig, setAppConfigPath } from '../conf'
import Payload from '../common/payload'

export default class ConfigController {
  @handle
  static async getAppConfig() {
    return Payload.success(await getAppConfig())
  }

  @handle
  static async setAppConfig(onfig: IAppConfig) {
    return Payload.success(setAppConfig(onfig))
  }

  @handle
  static async setAppConfigPath(config: IAppConfig) {
    return Payload.success(setAppConfigPath(config))
  }
}

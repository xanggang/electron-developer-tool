interface IConfig {

}

declare type IAppConfig = Partial<IConfig>
declare type IAppConfigKeyPath = KeyPaths<IConfig>;
declare type IAppConfigKeyPathValue<KeyPath> = KeyPathValue<IAppConfig, KeyPath>;

export interface IAuthConfig {
  jwtKey: string;
  googleClientId: string;
  googleClientSecret: string;
}

export interface IDbConfig {
  databaseUrl: string;
}

export interface IImageStorageConfig {
  accessToken: string;
  spaceId: string;
  environmentId: string;
}

export interface IAppConfig {
  auth: IAuthConfig;
  db: IDbConfig;
  imageHosting: IImageStorageConfig;
}

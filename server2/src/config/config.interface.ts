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

export interface IMailConfig {
  user: string;
  pass: string;
}

export interface ISmsConfig {
  apiKey: string;
  adminPhone: string;
}

export interface IServerConfig {
  port: string;
}

export interface IAppConfig {
  NODE_ENV: string;
  server: IServerConfig;
  auth: IAuthConfig;
  db: IDbConfig;
  imageHosting: IImageStorageConfig;
  mail: IMailConfig;
  sms: ISmsConfig;
}

export interface AuthConfig {
  jwtKey: string;
  googleClientId: string;
  googleClientSecret: string;
}

export interface DbConfig {
  databaseUrl: string;
}

export interface ImageHostingConfig {
  accessToken: string;
  spaceId: string;
  environmentId: string;
}

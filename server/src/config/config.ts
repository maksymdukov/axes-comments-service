interface Config {
  [key: string]: string;
}

export const config = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  JWT_KEY: process.env.JWT_KEY,
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  BUILD_FRONTEND_WEBHOOK: process.env.BUILD_FRONTEND_WEBHOOK,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
} as Config;

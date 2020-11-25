export default () => ({
  auth: {
    jwtKey: process.env.JWT_KEY,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  db: {
    databaseUrl: process.env.DATABASE_URI,
  },
  imageHosting: {
    accessToken: process.env.IMAGE_HOSTING_ACCESS_TOKEN,
    spaceId: process.env.IMAGE_HOSTING_SPACE_ID,
    environmentId: process.env.IMAGE_HOSTING_ENVIRONMENT_ID,
  },
  mail: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export default () => ({
  server: {
    port: process.env.PORT,
    apiUrl: process.env.REACT_APP_API_URL,
  },
  auth: {
    jwtKey: process.env.JWT_KEY,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  db: {
    databaseUrl: process.env.DATABASE_URI,
    mongodbUri: process.env.MONGODB_URI,
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
  sms: {
    apiKey: process.env.SMS_SERVICE_API_KEY,
    adminPhone: process.env.ADMIN_PHONE,
  },
  ssg: {
    buildFrontendHook: process.env.BUILD_FRONTEND_WEBHOOK,
  },
  np: {
    apiKey: process.env.NOVAPOSHTA_API_KEY,
  },
});

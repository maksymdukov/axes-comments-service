const checkEnvVars = () => {
  Object.keys(config).forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`${key} env is required`);
    }
  });
};

export const config = {
  PORT: process.env.PORT as string,
  MONGODB_URI: process.env.MONGODB_URI as string,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  JWT_KEY: process.env.JWT_KEY as string,
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID as string,
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  BUILD_FRONTEND_WEBHOOK: process.env.BUILD_FRONTEND_WEBHOOK as string,
  MAIL_USER: process.env.MAIL_USER as string,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD as string,
  FIREBASE_CONFIG: process.env.FIREBASE_CONFIG as string,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET as string,
  BUCKET_URL: process.env.BUCKET_URL as string,
  SMS_SERVICE_API_KEY: process.env.SMS_SERVICE_API_KEY as string,
  ADMIN_PHONE: process.env.ADMIN_PHONE as string
};

checkEnvVars();

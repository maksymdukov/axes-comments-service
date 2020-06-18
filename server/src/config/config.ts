if (!process.env.PORT) {
  throw new Error('PORT env is required');
}
if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI env is required');
}
if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error('GOOGLE_CLIENT_ID env is required');
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('GOOGLE_CLIENT_SECRET env is required');
}
if (!process.env.JWT_KEY) {
  throw new Error('JWT_KEY env is required');
}
if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID env is required');
}
if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_ACCESS_TOKEN env is required');
}
if (!process.env.BUILD_FRONTEND_WEBHOOK) {
  throw new Error('BUILD_FRONTEND_WEBHOOK env is required');
}
if (!process.env.MAIL_USER) {
  throw new Error('MAIL_USER env is required');
}
if (!process.env.FIREBASE_CONFIG) {
  throw new Error('FIREBASE_CONFIG env is required');
}
if (!process.env.FIREBASE_STORAGE_BUCKET) {
  throw new Error('FIREBASE_STORAGE_BUCKET env is required');
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
  FIREBASE_CONFIG: process.env.FIREBASE_CONFIG,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
};

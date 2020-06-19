import * as admin from 'firebase-admin';
import { config } from '../config/config';

const app = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(config.FIREBASE_CONFIG)),
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
});

export const bucket = app.storage().bucket();

interface UploadFileAttrs {
  path: string;
  name: string;
  type: string;
  folder: string;
}

export async function uploadFile({
  path,
  name,
  type,
  folder = '',
}: UploadFileAttrs) {
  // Uploads a local file to the bucket
  return bucket.upload(path, {
    contentType: type,
    public: true,
    destination: `${folder}${name}`,
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    // By setting the option `destination`, you can change the name of the
    // object you are uploading to a bucket.
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'public, max-age=31536000',
    },
  });
}

export const deleteFile = async (fileName: string) => {
  return bucket.deleteFiles({ prefix: fileName });
};

export const uploadCustomOrderImage = (
  attrs: Omit<UploadFileAttrs, 'folder'>
) => uploadFile({ ...attrs, folder: 'custom-order/' });

export const filesFilter = (req, file, cb) => {
  if (!file.mimetype.includes('image')) {
    return cb(new Error('Only images are allowed'), false);
  }
  cb(null, true);
};

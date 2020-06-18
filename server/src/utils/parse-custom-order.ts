import formidable from 'formidable';
import { Response, NextFunction, Request } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';

export const parseCustomOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sizeLimitBytes = 1024 * 1024 * 20; // 20 MB}
  if (Number(req.headers['content-length']) > sizeLimitBytes) {
    throw new RequestValidationError([
      { msg: 'Request is too big', param: 'request' },
    ]);
  }
  const form = new formidable.IncomingForm();
  const formfields = await new Promise(function (resolve) {
    form.parse(req, function (err, fields = {}, files = {}) {
      if (err) {
        throw new Error();
      }
      resolve({ fields: fields, files: files });
    });
  });

  req.body = {
    ...(formfields as any).fields,
    files: (formfields as any).files,
  };
  next();
};

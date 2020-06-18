import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { config } from '../../config/config';

const templatesDir = path.join(__dirname, 'templates');

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASSWORD,
  },
});

export const renderTemplate = (filename: string, data?: any) => {
  const filePath = path.join(templatesDir, filename);
  return ejs.renderFile(filePath, data, {
    root: templatesDir,
  });
};

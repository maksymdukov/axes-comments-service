import { google } from 'googleapis';
import { config } from '../config/config';
import jsonwebtoken from 'jsonwebtoken';
import { AuthorizationError } from '../errors/authorization-error';

export const oauth2Client = new google.auth.OAuth2(
  config.GOOGLE_CLIENT_ID,
  config.GOOGLE_CLIENT_SECRET,
  'postmessage'
);

export const getDecodedGoogleToken = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  if (!tokens.id_token) {
    // TODO
    throw new AuthorizationError();
  }
  const decodedToken = jsonwebtoken.decode(tokens.id_token) as {
    email: string;
  };
  return decodedToken;
};

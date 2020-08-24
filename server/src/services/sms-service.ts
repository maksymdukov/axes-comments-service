import axios from 'axios';
import { URLSearchParams } from 'url';
import { config } from '../config/config';

const SMS_SERVICE_URL = 'https://api.mobizon.ua/service/Message/SendSmsMessage';

const smsConfig = new URLSearchParams({
  output: 'json',
  api: 'v1',
  apiKey: config.SMS_SERVICE_API_KEY,
});

export const sendSMS = (recipient: string, text: string) => {
  const options = new URLSearchParams({
    recipient,
    text,
  });
  return axios.post(
    `${SMS_SERVICE_URL}?${smsConfig.toString()}`,
    options.toString(),
    {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }
  );
};

export const sendSMSToAdmin = (text: string) =>
  sendSMS(config.ADMIN_PHONE, text);

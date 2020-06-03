import { createClient } from 'contentful';
import { config } from '../config/config';

const contentfulClient = createClient({
  space: config.CONTENTFUL_SPACE_ID,
  accessToken: config.CONTENTFUL_ACCESS_TOKEN,
});

export { contentfulClient };

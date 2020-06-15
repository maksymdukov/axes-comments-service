import { createClient } from 'contentful';
import { config } from '../config/config';
import { AxeEntry } from '../utils/normalize';

export const contentfulClient = createClient({
  space: config.CONTENTFUL_SPACE_ID,
  accessToken: config.CONTENTFUL_ACCESS_TOKEN,
});

export const getAxeEntry = (id: string) =>
  contentfulClient.getEntry<AxeEntry>(id, {
    content_type: 'axe',
    locale: 'ru',
  });

export const getAxeEntries = (opts: any) =>
  contentfulClient.getEntries<AxeEntry>({
    content_type: 'axe',
    locale: 'ru',
    ...opts,
  });

export const getAxeEntriesById = (ids: string[]) =>
  getAxeEntries({
    'sys.id[in]': ids.join(','),
  });

import { NECESSARY_LANGUAGES } from './language.constants';
import { LanguageRepository } from './language.repository';

export const addLanguagesIfNotExist = async (
  lngRepository: LanguageRepository,
) => {
  const promises = NECESSARY_LANGUAGES.map(async (lng, idx) => {
    const foundLng = await lngRepository.findOne({ where: { name: lng } });
    if (!foundLng) {
      const newLng = lngRepository.create({ id: idx + 1, name: lng });
      return lngRepository.save(newLng);
    }
  });
  return Promise.all(promises);
};

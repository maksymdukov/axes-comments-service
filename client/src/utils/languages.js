export const getLanguagesMap = (languages = []) => {
  return languages.reduce((acc, lng) => {
    acc[lng.language.name] = lng;
    return acc;
  }, {});
};

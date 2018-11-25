export const createFieldLanguageHelper = (data, language) => {
  const languageSuffix = language.slice(0, 1).toUpperCase() + language.slice(1, 2)
  return field => {
    return data[`${field}${languageSuffix}`]
  }
}

export const aliasTranslatedFields = (data, language) => {
  const languageSuffix = language.slice(0, 1).toUpperCase() + language.slice(1, 2)
  for (const property in data) {
    if (data.hasOwnProperty(property) && property.endsWith(languageSuffix)) {
      data[property.slice(0, property.length - 2)] = data[property];
    }
  }

  return data
}

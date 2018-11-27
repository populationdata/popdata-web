export const createFieldLanguageHelper = (data, language) => {
  const languageSuffix =
    language.slice(0, 1).toUpperCase() + language.slice(1, 2)
  return field => {
    return data[`${field}${languageSuffix}`]
  }
}

export const aliasTranslatedFields = (data, language) => {
  const languageSuffix =
    language.slice(0, 1).toUpperCase() + language.slice(1, 2)
  for (const property in data) {
    if (data.hasOwnProperty(property)) {
      let propertyName = property
      if (propertyName.endsWith(languageSuffix)) {
        propertyName = property.slice(0, property.length - 2)
        data[propertyName] = data[property]
      }

      if (typeof data[propertyName] === 'object') {
        aliasTranslatedFields(data[propertyName], language)
      }
    }
  }

  return data
}

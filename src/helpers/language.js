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
    if (data.hasOwnProperty(property) && property.endsWith(languageSuffix)) {
      const targetPropertyName = property.slice(0, property.length - 2)
      if (data[targetPropertyName]) {
        data[targetPropertyName + (languageSuffix === 'En' ? 'Fr' : 'En')] =
          data[property]
      }
      data[targetPropertyName] = data[property]
    }
  }

  return data
}

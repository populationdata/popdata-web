export const numberFormat =
  process.env.GATSBY_LANGUAGE === 'fr'
    ? new Intl.NumberFormat('fr-FR')
    : new Intl.NumberFormat('en-US')

export default ({ value }) => numberFormat.format(value)

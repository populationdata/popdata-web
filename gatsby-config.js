module.exports = {
  siteMetadata: {
    siteUrl: process.env.URL || 'https://www.populationdata.net',
    title: 'PopulationData.net',
    titleTemplate: '%s - PopulationData.net',
    description:
      process.env.GATSBY_LANGUAGE === 'fr'
        ? 'Informations, cartes et statistiques sur les populations et les pays du monde.'
        : 'Informations, maps and statistics of the populations and countries of the World.',
    language: process.env.GATSBY_LANGUAGE,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Open Sans\:400,700`],
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-glamor`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data/continents`,
        name: 'continents',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data/countries`,
        name: 'countries',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data/maps`,
        name: 'maps',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data/subcontinents`,
        name: 'subcontinents',
      },
    },
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', disallow: '/' }],
      },
    },
    `gatsby-plugin-sitemap`,
  ],
  mapping: {
    'SubcontinentsYaml.continent': `ContinentsYaml.title`,
    'CountriesYaml.subcontinent': `SubcontinentsYaml.title`,
    'MapsYaml.continents': `ContinentsYaml.title`,
    'MapsYaml.countries': `CountriesYaml.title`,
  },
}

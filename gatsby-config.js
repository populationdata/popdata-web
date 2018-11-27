module.exports = {
  siteMetadata: {
    title: 'PopulationData.net',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
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
        path: `${__dirname}/data/subcontinents`,
        name: 'subcontinents',
      },
    },
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify',
  ],
  mapping: {
    'SubcontinentsYaml.continent': `ContinentsYaml.title`,
    'CountriesYaml.subcontinent': `SubcontinentsYaml.title`,
  },
}

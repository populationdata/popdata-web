module.exports = {
  siteMetadata: {
    title: 'PopulationData.net',
    language: process.env.GATSBY_LANGUAGE,
  },
  plugins: [
    `gatsby-plugin-sass`,
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
  ],
  mapping: {
    'SubcontinentsYaml.continent': `ContinentsYaml.title`,
    'CountriesYaml.subcontinent': `SubcontinentsYaml.title`,
  },
}

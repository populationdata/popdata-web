const path = require('path')
const slug = require('slug')
const gql = require('gatsby/graphql')
const _ = require('lodash')
const excerpts = require('excerpts')
const language = process.env.GATSBY_LANGUAGE

const getCategory = type => {
  switch (type) {
    case 'ContinentsYaml':
      return 'continents'
    case 'CountriesYaml':
      return language === 'fr' ? 'pays' : 'countries'
    case 'MapsYaml':
      return language === 'fr' ? 'cartes' : 'maps'
    case 'PostsYaml':
      return language === 'fr' ? 'articles' : 'posts'
  }
}

const atlas = {
  continents: {},
  countries: {},
  subcontinents: {},
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (
    [
      'ContinentsYaml',
      'CountriesYaml',
      'MapsYaml',
      'PostsYaml',
      'SubcontinentsYaml',
    ].includes(node.internal.type)
  ) {
    const translatedObject = node[language]
    for (const property in translatedObject) {
      if (translatedObject.hasOwnProperty(property)) {
        createNodeField({
          name: property,
          node,
          value: translatedObject[property],
        })
      }
    }
    if (['ContinentsYaml', 'CountriesYaml'].includes(node.internal.type)) {
      if (node.fields && node.fields.name) {
        createNodeField({
          name: `slug`,
          node,
          value: `/${getCategory(node.internal.type)}/${slug(node.fields.name, {
            lower: true,
          })}/`,
        })
      }
    }
    if (['MapsYaml', 'PostsYaml'].includes(node.internal.type)) {
      if (node.fields && node.fields.title) {
        createNodeField({
          name: `slug`,
          node,
          value: `/${getCategory(node.internal.type)}/${
            node.internal.type === 'MapsYaml'
              ? node.title
              : slug(node.fields.title, {
                  lower: true,
                })
          }/`,
        })
      }
    }

    switch (node.internal.type) {
      case 'ContinentsYaml':
        atlas.continents[node.title] = node
        break
      case 'CountriesYaml':
        atlas.countries[node.title] = node
        break
      case 'SubcontinentsYaml':
        atlas.subcontinents[node.title] = node
        break
    }
  }
}

const countriesInContinent = continentTitle => {
  const allSubContinentTitles = Object.values(atlas.subcontinents)
    .filter(x => x.continent === continentTitle)
    .map(x => x.title)
  return Object.values(atlas.countries).filter(x =>
    allSubContinentTitles.includes(x.subcontinent)
  )
}

const statsOnlyCountriesInContinent = continentTitle =>
  countriesInContinent(continentTitle).filter(x => !x.settings.noStats)

const sumGraphQLField = (dataset, sumBy) => ({
  type: gql.GraphQLFloat,
  resolve: source => _.sumBy(dataset(source), sumBy),
})

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if (type.name === `ContinentsYaml`) {
    return {
      area: sumGraphQLField(
        source => statsOnlyCountriesInContinent(source.title),
        x => parseInt(x.area, 10)
      ),
      numberOfCountries: sumGraphQLField(
        source => statsOnlyCountriesInContinent(source.title),
        _ => 1
      ),
      population: sumGraphQLField(
        source => statsOnlyCountriesInContinent(source.title),
        x => parseInt(x.population.population, 10)
      ),
    }
  }
  if (type.name === `SubcontinentsYaml`) {
    return {
      continentNodeId: {
        type: gql.GraphQLString,
        resolve: source => {
          const continent = atlas.continents[source.continent]
          if (continent) {
            return continent.id
          }
        },
      },
    }
  }
  if (type.name === `CountriesYaml`) {
    return {
      continentNodeId: {
        type: gql.GraphQLString,
        resolve: source => {
          const subcontinent = atlas.subcontinents[source.subcontinent]
          if (subcontinent) {
            return atlas.continents[subcontinent.continent].id
          }
          return null
        },
      },
    }
  }
  if (type.name === `MapsYaml`) {
    return {
      continentNodeIds: {
        type: gql.GraphQLList(gql.GraphQLString),
        resolve: source => {
          if (!source.continents) {
            return []
          }
          return source.continents
            .map(x =>
              atlas.continents[x] ? atlas.continents[x].id : undefined
            )
            .filter(x => !!x)
        },
      },
      countryNodeIds: {
        type: gql.GraphQLList(gql.GraphQLString),
        resolve: source => {
          if (!source.countries) {
            return []
          }
          return source.countries
            .map(x => (atlas.countries[x] ? atlas.countries[x].id : undefined))
            .filter(x => !!x)
        },
      },
    }
  }
  if (type.name === `PostsYaml`) {
    return {
      excerpt: {
        type: gql.GraphQLString,
        resolve: source => {
          return excerpts(source.fields.body, { words: 50 })
        },
      },
    }
  }

  return {}
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allContinentsYaml {
        edges {
          node {
            id
            internal {
              type
            }
            fields {
              slug
            }
          }
        }
      }
      allCountriesYaml {
        edges {
          node {
            id
            internal {
              type
            }
            fields {
              slug
            }
          }
        }
      }
      allMapsYaml {
        edges {
          node {
            id
            internal {
              type
            }
            fields {
              slug
            }
          }
        }
      }
      allPostsYaml {
        edges {
          node {
            id
            internal {
              type
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const content = result.data.allContinentsYaml.edges
      .concat(result.data.allCountriesYaml.edges)
      .concat(result.data.allMapsYaml.edges)
      .concat(result.data.allPostsYaml.edges)
    content.forEach(edge => {
      if (edge.node.fields && edge.node.fields.slug) {
        const component = path.resolve(
          `src/templates/${String(
            edge.node.internal.type.slice(0, edge.node.internal.type.length - 4)
          )}.js`
        )
        createPage({
          path: edge.node.fields.slug,
          component,
          context: {
            id: edge.node.id,
          },
        })
      }
    })
    result.data.allContinentsYaml.edges.forEach(edge => {
      if (edge.node.fields && edge.node.fields.slug) {
        const component = path.resolve(`src/templates/ContinentAllMaps.js`)
        createPage({
          path: `${edge.node.fields.slug}${
            language === 'fr' ? 'cartes' : 'maps'
          }`,
          component,
          context: {
            id: edge.node.id,
          },
        })
      }
    })
    result.data.allCountriesYaml.edges.forEach(edge => {
      if (edge.node.fields && edge.node.fields.slug) {
        const component = path.resolve(`src/templates/CountryAllMaps.js`)
        createPage({
          path: `${edge.node.fields.slug}${
            language === 'fr' ? 'cartes' : 'maps'
          }`,
          component,
          context: {
            id: edge.node.id,
          },
        })
      }
    })

    const postsPerPage = 5
    const numberOfFrontPages = Math.round(
      result.data.allPostsYaml.edges.length / postsPerPage
    )

    for (let index = 0; index < numberOfFrontPages; index++) {
      createPage({
        path: index === 0 ? `/` : `/page/${index + 1}`,
        component: path.resolve(`src/templates/Home.js`),
        context: {
          index,
          limit: postsPerPage,
          skip: index * postsPerPage,
          totalPages: numberOfFrontPages,
        },
      })
    }
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /datamaps/,
            use: loaders.null(),
          },
          {
            test: /leaflet/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

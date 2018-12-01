const _ = require('lodash')
const path = require('path')
const slug = require('slug')
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
          value: `/${getCategory(node.internal.type)}/${slug(
            node.fields.title,
            {
              lower: true,
            }
          )}/`,
        })
      }
    }
  }
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
  })
}

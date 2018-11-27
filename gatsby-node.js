const _ = require('lodash')
const path = require('path')
const slug = require('slug')

const getCategory = (type, language) => {
  switch (type) {
    case 'ContinentsYaml':
      return 'continents'
    case 'CountriesYaml':
      return language === 'fr' ? 'pays' : 'countries'
  }
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (['ContinentsYaml', 'CountriesYaml'].includes(node.internal.type)) {
    createNodeField({
      name: `slugFr`,
      node,
      value: `/fr/${getCategory(node.internal.type, 'fr')}/${slug(node.title, {
        lower: true,
      })}/`,
    })
    createNodeField({
      name: `slugEn`,
      node,
      value: `/en/${getCategory(node.internal.type, 'en')}/${slug(
        node.titleEn,
        { lower: true }
      )}/`,
    })
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
              slugEn
              slugFr
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
              slugEn
              slugFr
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

    const content = result.data.allContinentsYaml.edges.concat(
      result.data.allCountriesYaml.edges
    )
    content.forEach(edge => {
      const component = path.resolve(
        `src/templates/${String(
          edge.node.internal.type.slice(0, edge.node.internal.type.length - 4)
        )}.js`
      )
      createPage({
        path: edge.node.fields.slugFr,
        component,
        context: {
          id: edge.node.id,
          language: 'fr',
        },
      })
      createPage({
        path: edge.node.fields.slugEn,
        component,
        context: {
          id: edge.node.id,
          language: 'en',
        },
      })
    })
  })
}

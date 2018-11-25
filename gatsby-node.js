const _ = require('lodash')
const path = require('path')
const slug = require('slug')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      name: `slugFr`,
      node,
      value: `/fr/${slug(node.frontmatter.titleFr, { lower: true })}/`,
    })
    createNodeField({
      name: `slugEn`,
      node,
      value: `/en/${slug(node.frontmatter.titleEn, { lower: true })}/`,
    })
    const parent = getNode(_.get(node, 'parent'))
    createNodeField({
      node,
      name: 'collection',
      value: _.get(parent, 'sourceInstanceName'),
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slugFr
              slugEn
              collection
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

    const content = result.data.allMarkdownRemark.edges
    content.forEach(edge => {
      createPage({
        path: edge.node.fields.slugFr,
        component: path.resolve(
          `src/templates/${String(edge.node.fields.collection)}.js`
        ),
        context: {
          id: edge.node.id,
          language: 'fr'
        },
      })
      createPage({
        path: edge.node.fields.slugEn,
        component: path.resolve(
          `src/templates/${String(edge.node.fields.collection)}.js`
        ),
        context: {
          id: edge.node.id,
          language: 'en'
        },
      })
    })
  })
}

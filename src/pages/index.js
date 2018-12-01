import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'

const IndexPage = ({ data }) => (
  <Layout>
    <div>
      {data.allContinentsYaml.edges
        .map(x => x.node)
        .map(x => (
          <li>
            <Link to={x.fields.slug}>{x.fields.name}</Link>
          </li>
        ))}
    </div>
  </Layout>
)

export default IndexPage

export const indexQuery = graphql`
  query Index {
    allContinentsYaml {
      edges {
        node {
          fields {
            slug
            name
          }
        }
      }
    }
  }
`

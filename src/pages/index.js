import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'

const IndexPage = ({ data }) => (
  <Layout>
    <h1>Welcome to PopulationData.net</h1>
    <div>
      {data.allContinentsYaml.edges
        .map(x => x.node)
        .map(x => (
          <li>
            <Link to={x.fields.slugFr}>{x.title}</Link>
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
          id
          fields {
            slugFr
            slugEn
          }
          title
          titleEn
        }
      }
    }
  }
`

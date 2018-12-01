import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import ColBlockItems from '../components/ColBlockItems'
import ColBlock from '../components/ColBlock'

const ColCountries = ({ items }) => (
  <ColBlockItems title="Fiches pays" items={items} />
)
const ColRankings = () => <ColBlock title="Palmarès" />

const IndexPage = ({ data }) => (
  <Layout
    col1={[
      ColCountries({ items: data.continents.edges.map(x => x.node.fields) }),
      ColRankings(),
    ]}
  >
    This is where content will appear.
  </Layout>
)

export default IndexPage

export const indexQuery = graphql`
  query Index {
    continents: allContinentsYaml(sort: { fields: [fields___name] }) {
      edges {
        node {
          fields {
            link: slug
            title: name
          }
        }
      }
    }
  }
`

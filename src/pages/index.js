import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import ColBlockItems from '../components/ColBlockItems'
import ColBlock from '../components/ColBlock'

const allLabels = {
  fr: {
    colCountries: 'Fiches pays',
    colRankings: 'Palmarès',
  },
  en: {
    colCountries: 'Country profiles',
    colRankings: 'Rankings',
  },
}

const labels = allLabels[process.env.GATSBY_LANGUAGE]

const IndexPage = ({ data }) => (
  <Layout
    col1={[
      <ColBlockItems
        key="col-country"
        title={labels.colCountries}
        items={data.continents.edges.map(x => x.node.fields)}
      />,
      <ColBlock key="col-rankings" title={labels.colRankings} />,
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

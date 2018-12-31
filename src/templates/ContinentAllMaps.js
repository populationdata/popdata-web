import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import MapList from '../components/MapList'

const ContinentAllMapsPage = ({ data: { continent, maps } }) => (
  <Layout title={continent.fields.name}>
    <MapList maps={maps} />
  </Layout>
)

export default ContinentAllMapsPage

export const query = graphql`
  query ContinentAllMapsPage($id: String!) {
    continent: continentsYaml(id: { eq: $id }) {
      fields {
        slug
        name
      }
    }
    maps: allMapsYaml(filter: { continentNodeIds: { in: [$id] } }) {
      ...MapList
    }
  }
`

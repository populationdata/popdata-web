import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import MapList from '../components/MapList'

const CountryAllMapsPage = ({ data: { country, maps } }) => (
  <Layout title={country.fields.name}>
    <MapList maps={maps} />
  </Layout>
)

export default CountryAllMapsPage

export const query = graphql`
  query CountryAllMapsPage($id: String!) {
    country: countriesYaml(id: { eq: $id }) {
      fields {
        name
        slug
      }
    }
    maps: allMapsYaml(filter: { countryNodeIds: { in: [$id] } }) {
      ...MapList
    }
  }
`

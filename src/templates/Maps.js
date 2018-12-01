import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

const MapPage = ({ data }) => {
  return (
    <Layout>
      <h1>{data.map.fields.title}</h1>
    </Layout>
  )
}

export default MapPage

export const mapQuery = graphql`
  query MapByID($id: String!) {
    map: mapsYaml(id: { eq: $id }) {
      fields {
        title
      }
    }
  }
`

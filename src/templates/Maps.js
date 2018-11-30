import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

const MapPage = ({ data }) => {
  const map = data.mapsYaml

  return (
    <Layout>
      <h1>{map.fields.name}</h1>
    </Layout>
  )
}

export default MapPage

export const mapQuery = graphql`
  query MapByID($id: String!) {
    mapsYaml(id: { eq: $id }) {
      fields {
        name
      }
    }
  }
`

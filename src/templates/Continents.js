import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

const ContinentPage = ({ data }) => {
  return (
    <Layout>
      <h1>{data.continent.fields.name}</h1>
    </Layout>
  )
}

export default ContinentPage

export const continentQuery = graphql`
  query ContinentByID($id: String!) {
    continent: continentsYaml(id: { eq: $id }) {
      title
      fields {
        name
      }
    }
  }
`

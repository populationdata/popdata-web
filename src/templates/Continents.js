import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SubContinents from '../components/SubContinents'

const ContinentPage = ({ data }) => {
  const continent = data.continentsYaml

  return (
    <Layout>
      <h1>{continent.fields.name}</h1>
      <SubContinents continentTitle={continent.title} />
    </Layout>
  )
}

export default ContinentPage

export const continentQuery = graphql`
  query ContinentByID($id: String!) {
    continentsYaml(id: { eq: $id }) {
      title
      fields {
        name
      }
    }
  }
`

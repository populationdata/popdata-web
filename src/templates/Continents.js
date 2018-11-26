import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { aliasTranslatedFields } from '../helpers/language'

const ContinentPage = ({ data, pageContext }) => {
  const continent = aliasTranslatedFields(
    data.continentsYaml,
    pageContext.language
  )

  return (
    <Layout>
      <h1>{continent.title}</h1>
    </Layout>
  )
}

export default ContinentPage

export const continentQuery = graphql`
  query ContinentByID($id: String!) {
    continentsYaml(id: { eq: $id }) {
      id
      title
      titleEn
    }
  }
`

import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { aliasTranslatedFields } from '../helpers/language'

const ContinentPage = ({ data, pageContext }) => {
  const continent = aliasTranslatedFields(
    data.markdownRemark.frontmatter,
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
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        titleFr
        titleEn
      }
    }
  }
`

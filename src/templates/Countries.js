import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { aliasTranslatedFields } from '../helpers/language'

const CountryPage = ({ data, pageContext }) => {
  const country = aliasTranslatedFields(
    data.countriesYaml,
    pageContext.language
  )

  return (
    <Layout>
      <h1>{country.title}</h1>
    </Layout>
  )
}

export default CountryPage

export const countryQuery = graphql`
  query CountryByID($id: String!) {
    countriesYaml(id: { eq: $id }) {
      id
      title
      titleEn
    }
  }
`

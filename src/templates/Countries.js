import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { aliasTranslatedFields } from '../helpers/language'
import { HTMLContent } from '../components/Content'

const CountryPage = ({ data, pageContext }) => {
  const country = aliasTranslatedFields(
    data.countriesYaml,
    pageContext.language
  )

  return (
    <Layout>
      <h1>{country.name}</h1>
      <section>
        <HTMLContent content={country.description} />
      </section>
    </Layout>
  )
}

export default CountryPage

export const countryQuery = graphql`
  query CountryByID($id: String!) {
    countriesYaml(id: { eq: $id }) {
      descriptionEn
      descriptionFr
      id
      nameFr
      nameEn
      title
    }
  }
`

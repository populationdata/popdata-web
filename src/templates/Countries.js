import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

const CountryPage = ({ data }) => {
  const country = data.countriesYaml

  return (
    <Layout>
      <h1>{country.fields.name}</h1>
      <section>
        <HTMLContent content={country.fields.description} />
      </section>
    </Layout>
  )
}

export default CountryPage

export const countryQuery = graphql`
  query CountryByID($id: String!) {
    countriesYaml(id: { eq: $id }) {
      title
      fields {
        name
        description
      }
    }
  }
`

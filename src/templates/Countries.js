import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

const CountryPage = ({ data }) => {
  return (
    <Layout>
      <h1>{data.country.fields.name}</h1>
      <section>
        <HTMLContent content={data.country.fields.description} />
      </section>
    </Layout>
  )
}

export default CountryPage

export const countryQuery = graphql`
  query CountryByID($id: String!) {
    country: countriesYaml(id: { eq: $id }) {
      title
      fields {
        name
        description
      }
    }
  }
`

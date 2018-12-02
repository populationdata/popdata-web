import React from 'react'
import { graphql, Link } from 'gatsby'
import { Table } from 'reactstrap'
import Layout from '../components/Layout'

const allLabels = {
  fr: {
    colCountries: 'Pays et territoires',
    colPopulation: 'Population',
    inhabitants: 'habitants',
  },
  en: {
    colCountries: 'Countries and territories',
    colPopulation: 'Population',
    inhabitants: 'inhabitants',
  },
}

const labels = allLabels[process.env.GATSBY_LANGUAGE]

const SubContinentSection = ({ name, countries }) => (
  <section>
    <h2>{name}</h2>
    <Table size="sm">
      <thead>
        <tr>
          <th>{labels.colCountries}</th>
          <th>{labels.colPopulation}</th>
        </tr>
      </thead>
      <tbody>
        {countries.map(country => (
          <tr>
            <th>
              <Link to={country.fields.slug}>{country.fields.name}</Link>
            </th>
            <td>
              {country.population.population} {labels.inhabitants}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </section>
)

const ContinentPage = ({ data }) => (
  <Layout>
    <h1>{data.continent.fields.name}</h1>
    {data.subcontinents.edges
      .map(subcontinent => subcontinent.node)
      .map(subcontinent => (
        <SubContinentSection
          name={subcontinent.fields.name}
          countries={data.countries.edges
            .map(country => country.node)
            .filter(
              country => country.subcontinent.title === subcontinent.title
            )}
        />
      ))}
  </Layout>
)

export default ContinentPage

export const continentQuery = graphql`
  query ContinentPage($id: String!) {
    continent: continentsYaml(id: { eq: $id }) {
      title
      fields {
        name
      }
    }
    subcontinents: allSubcontinentsYaml(
      filter: { continentNodeId: { eq: $id } }
      sort: { fields: [fields___name] }
    ) {
      edges {
        node {
          title
          fields {
            name
          }
        }
      }
    }
    countries: allCountriesYaml(filter: { continentNodeId: { eq: $id } }) {
      edges {
        node {
          subcontinent {
            title
          }
          fields {
            slug
            name
          }
          population {
            population
          }
        }
      }
    }
  }
`

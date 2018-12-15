import React from 'react'
import { graphql, Link } from 'gatsby'
import { css } from 'glamor'
import Layout from '../components/Layout'
import ColBlock from '../components/ColBlock'
import DataTable from '../components/DataTable'
import NumberFormat from '../components/NumberFormat'

const allLabels = {
  fr: {
    colCountries: 'Pays et territoires',
    colPopulation: 'Population',
    inhabitants: 'habitants',
    maps: 'Cartes',
  },
  en: {
    colCountries: 'Countries and territories',
    colPopulation: 'Population',
    inhabitants: 'inhabitants',
    maps: 'Maps',
  },
}

const labels = allLabels[process.env.GATSBY_LANGUAGE]

const SubContinentSection = ({ name, countries }) => (
  <section
    {...css({
      marginTop: '25px',
    })}
  >
    <h2>{name}</h2>
    <DataTable
      columns={[
        {
          id: 'country',
          header: labels.colCountries,
          renderer: country => (
            <Link to={country.fields.slug}>{country.fields.name}</Link>
          ),
          rowClassName: 'text-left',
          valueAccessor: country => country.fields.name,
        },
        {
          className: 'w-25',
          id: 'population',
          header: labels.colPopulation,
          renderer: country => (
            <>
              <NumberFormat value={country.population.population} />{' '}
              {labels.inhabitants}
            </>
          ),
          rowClassName: 'text-right',
          valueAccessor: country => country.population.population,
        },
      ]}
      data={countries}
      defaultSort="country"
    />
  </section>
)

const ContinentPage = ({ data }) => (
  <Layout col1={<ColBlock title={labels.maps} />}>
    <h1>{data.continent.fields.name}</h1>
    {data.subcontinents.edges
      .map(subcontinent => subcontinent.node)
      .map(subcontinent => (
        <SubContinentSection
          key={subcontinent.id}
          name={subcontinent.fields.name}
          countries={data.countries.edges
            .map(country => country.node)
            .filter(
              country => country.subcontinent.title === subcontinent.title
            )
            .sort(
              (c1, c2) => c1.population.population > c2.population.population
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
          id
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
          id
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

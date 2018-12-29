import React from 'react'
import { graphql, Link } from 'gatsby'
import { css } from 'glamor'
import Layout from '../components/Layout'
import ColBlockItems from '../components/ColBlockItems'
import HeaderTable from '../components/HeaderTable'
import DataMap from '../components/DataMap'
import DataTable from '../components/DataTable'
import NumberFormat, { numberFormat } from '../components/NumberFormat'

const allLabels = {
  fr: {
    area: 'Superficie',
    countries: 'Pays et territoires',
    inhabitants: 'habitants',
    maps: 'Cartes',
    numberOfCountries: 'Nombre de pays & territoires',
    population: 'Population',
  },
  en: {
    area: 'Area',
    countries: 'Countries and territories',
    inhabitants: 'inhabitants',
    maps: 'Maps',
    numberOfCountries: 'Number of countries & territories',
    population: 'Population',
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
          header: labels.countries,
          renderer: country => (
            <Link to={country.fields.slug}>{country.fields.name}</Link>
          ),
          rowClassName: 'text-left',
          valueAccessor: country => country.fields.name,
        },
        {
          className: 'w-25',
          id: 'population',
          header: labels.population,
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

const ContinentHeader = ({ continent }) => (
  <HeaderTable
    rows={[
      {
        id: 'population',
        header: labels.population,
        renderer: value => (
          <>
            <NumberFormat value={value.population} /> {labels.inhabitants}
          </>
        ),
      },
      {
        id: 'area',
        header: labels.area,
        renderer: value => (
          <>
            <NumberFormat value={value.area} /> km²
          </>
        ),
      },
      {
        id: 'numberOfCountries',
        header: labels.numberOfCountries,
      },
    ]}
    data={continent}
  />
)

const ContinentPage = ({ data }) => (
  <Layout
    col1={
      <ColBlockItems
        title={labels.maps}
        items={data.maps.edges
          .sort((a, b) =>
            a.node.fields.title.localeCompare(b.node.fields.title)
          )
          .map(x => ({
            link: x.node.fields.slug,
            title: x.node.fields.title,
          }))}
      />
    }
  >
    <h1>{data.continent.fields.name}</h1>
    <section>
      <ContinentHeader continent={data.continent} />
    </section>
    {data.continent.datamapScope && (
      <section>
        <DataMap
          scope={data.continent.datamapScope}
          data={data.countries.edges
            .filter(x => !!x.node.iso3)
            .map(x => ({
              iso3: x.node.iso3,
              title: x.node.fields.name,
              value: x.node.population.population,
            }))}
          valueFormatter={value =>
            `${numberFormat.format(value)} ${labels.inhabitants}`
          }
        />
      </section>
    )}
    <section>
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
    </section>
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
      area
      datamapScope
      numberOfCountries
      population
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
          iso3
        }
      }
    }
    maps: allMapsYaml(filter: { continentNodeIds: { in: [$id] } }) {
      edges {
        node {
          id
          fields {
            slug
            title
          }
        }
      }
    }
  }
`

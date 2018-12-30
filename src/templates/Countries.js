import React from 'react'
import { css } from 'glamor'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ColBlockMaps from '../components/ColBlockMaps'
import { HTMLContent } from '../components/Content'

const contentCss = css({
  '& img': {
    height: 'auto',
    maxWidth: '100%',
  },
})

const CountryPage = ({ data }) => {
  return (
    <Layout
      title={data.country.fields.name}
      col1={<ColBlockMaps maps={data.maps} />}
    >
      <h1>{data.country.fields.name}</h1>
      <section>
        <HTMLContent
          {...contentCss}
          content={data.country.fields.description}
        />
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
    maps: allMapsYaml(filter: { countryNodeIds: { in: [$id] } }) {
      ...ColBlockMaps
    }
  }
`

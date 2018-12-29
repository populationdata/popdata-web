import React from 'react'
import { css } from 'glamor'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ColBlockItems from '../components/ColBlockItems'
import { HTMLContent } from '../components/Content'

const allLabels = {
  fr: {
    maps: 'Cartes',
  },
  en: {
    maps: 'Maps',
  },
}

const labels = allLabels[process.env.GATSBY_LANGUAGE]

const contentCss = css({
  '& img': {
    height: 'auto',
    maxWidth: '100%',
  },
})

const CountryPage = ({ data }) => {
  return (
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

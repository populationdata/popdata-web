import React from 'react'
import { css } from 'glamor'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import ColBlockMaps from '../components/ColBlockMaps'
import { HTMLContent } from '../components/Content'

const allLabels = {
  fr: {
    allMaps: 'Voir toutes les cartes',
    mapLink: 'cartes',
  },
  en: {
    allMaps: 'See all maps',
    mapLink: 'maps',
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
      <section>
        <Link to={`${data.country.fields.slug}/${labels.mapLink}`}>
          {labels.allMaps}
        </Link>
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
        slug
        name
        description
      }
    }
    maps: allMapsYaml(filter: { countryNodeIds: { in: [$id] } }) {
      ...ColBlockMaps
    }
  }
`

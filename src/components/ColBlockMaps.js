import React from 'react'
import { graphql } from 'gatsby'
import ColBlockItems from './ColBlockItems'

const allLabels = {
  fr: {
    maps: 'Cartes',
  },
  en: {
    maps: 'Maps',
  },
}

const labels = allLabels[process.env.GATSBY_LANGUAGE]

const ColBlockMaps = ({ maps }) => (
  <ColBlockItems
    title={labels.maps}
    items={maps.edges
      .filter(x => !!x.node.fields && !!x.node.fields.title)
      .sort((a, b) => a.node.fields.title.localeCompare(b.node.fields.title))
      .map(x => ({
        link: x.node.fields.slug,
        title: x.node.fields.title,
      }))}
  />
)

export const query = graphql`
  fragment ColBlockMaps on MapsYamlConnection {
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
`

export default ColBlockMaps

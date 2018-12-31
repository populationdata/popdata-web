import React from 'react'
import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'

const MapList = ({ maps }) =>
  maps.edges.map(x => (
    <article key={x.node.fields.slug}>
      <h3>
        <Link to={x.node.fields.slug}>{x.node.fields.title}</Link>
      </h3>
    </article>
  ))

MapList.propTypes = {
  maps: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export const query = graphql`
  fragment MapList on MapsYamlConnection {
    edges {
      node {
        id
        fields {
          slug
          title
        }
        image
        source
        type
      }
    }
  }
`

export default MapList

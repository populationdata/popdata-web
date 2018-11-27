import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { aliasTranslatedFields } from '../helpers/language'

const MapPage = ({ data, pageContext }) => {
  const map = aliasTranslatedFields(data.mapsYaml, pageContext.language)

  return (
    <Layout>
      <h1>{map.name}</h1>
    </Layout>
  )
}

export default MapPage

export const mapQuery = graphql`
  query MapByID($id: String!) {
    mapsYaml(id: { eq: $id }) {
      id
      nameFr
      nameEn
      title
    }
  }
`

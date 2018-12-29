import React from 'react'
import { graphql, Link } from 'gatsby'
import { css } from 'glamor'
import Layout from '../components/Layout'

const allLabels = {
  fr: {
    continents: 'Continents :',
    countries: 'Pays :',
    seeAlso: 'Voir aussi',
    source: 'Source :',
  },
  en: {
    continents: 'Continents:',
    countries: 'Countries:',
    seeAlso: 'See also',
    source: 'Source:',
  },
}

const labels = allLabels[process.env.GATSBY_LANGUAGE]

const mapImgCss = css({
  marginTop: 20,
  textAlign: 'center',
})

const sourceCss = css({
  fontStyle: 'italic',
})

const seeAlsoCss = css({
  marginTop: 20,
})

const MapPage = ({ data }) => {
  return (
    <Layout>
      <h1>{data.map.fields.title}</h1>
      {data.map.type === 'image' && (
        <div {...mapImgCss}>
          <img
            className="img-fluid"
            src={data.map.image}
            alt={data.map.fields.title}
          />
        </div>
      )}
      {data.map.source && (
        <div {...sourceCss}>
          {labels.source}
          {data.map.source}
        </div>
      )}
      <div {...seeAlsoCss}>
        <h4>{labels.seeAlso}</h4>
        {data.map.continents.length > 0 && (
          <div>
            {labels.continents}{' '}
            {data.map.continents.map((x, index) => (
              <>
                <Link to={x.fields.slug}>{x.fields.name}</Link>
                {index !== data.map.continents.length - 1 && ', '}
              </>
            ))}
          </div>
        )}
        {data.map.countries.length > 0 && (
          <div>
            {labels.countries}{' '}
            {data.map.countries.map((x, index) => (
              <>
                <Link to={x.fields.slug}>{x.fields.name}</Link>
                {index !== data.map.countries.length - 1 && ', '}
              </>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default MapPage

export const mapQuery = graphql`
  query MapByID($id: String!) {
    map: mapsYaml(id: { eq: $id }) {
      fields {
        title
      }
      image
      source
      type
      continents {
        fields {
          name
          slug
        }
      }
      countries {
        fields {
          name
          slug
        }
      }
    }
  }
`

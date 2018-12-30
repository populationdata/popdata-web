import React from 'react'
import { graphql, Link } from 'gatsby'
import { css } from 'glamor'
import Layout from '../components/Layout'
import withClientOnly from '../components/ClientOnly'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'

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

const ImageMapRenderer = ({ map }) => (
  <div {...mapImgCss}>
    <img className="img-fluid" src={map.image} alt={map.fields.title} />
  </div>
)

const leafletCss = css({
  height: 760,
  '& .leaflet-container': {
    height: '100%',
    margin: '0 auto',
    width: '100%',
  },
})

const LeafletMapRenderer = withClientOnly(({ map }) => (
  <LeafletMap
    animate={true}
    center={[map.tiles.latitude, map.tiles.longitude]}
    zoom={map.tiles.zoom}
  >
    {map.tiles.type === 'roadmap' && (
      <TileLayer
        attribution='&amp;copy <a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>'
        url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png"
      />
    )}
    {(map.tiles.type === 'satellite' || map.tiles.type === 'hybrid') && (
      <TileLayer
        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
    )}
    {map.tiles.type === 'terrain' && (
      <TileLayer
        attribution={`Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)`}
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        maxZoom={17}
      />
    )}
    });
  </LeafletMap>
))

const EmbedMapRenderer = ({ map }) => (
  <div dangerouslySetInnerHTML={{ __html: map.embed }} />
)

const sourceCss = css({
  fontStyle: 'italic',
})

const seeAlsoCss = css({
  marginTop: 20,
})

const MapPage = ({ data }) => {
  return (
    <Layout title={data.map.fields.title}>
      <h1>{data.map.fields.title}</h1>
      {data.map.type === 'image' && <ImageMapRenderer map={data.map} />}
      {data.map.type === 'tiles' && (
        <div {...leafletCss}>
          <LeafletMapRenderer map={data.map} />
        </div>
      )}
      {data.map.type === 'embed' && <EmbedMapRenderer map={data.map} />}
      {data.map.source && (
        <div {...sourceCss}>
          {labels.source} {data.map.source}
        </div>
      )}
      <div {...seeAlsoCss}>
        <h4>{labels.seeAlso}</h4>
        {data.map.continents.length > 0 && (
          <div>
            {labels.continents}{' '}
            {data.map.continents.map((x, index) => (
              <>
                <Link key={x.fields.slug} to={x.fields.slug}>
                  {x.fields.name}
                </Link>
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
                <Link key={x.fields.slug} to={x.fields.slug}>
                  {x.fields.name}
                </Link>
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
      tiles {
        latitude
        longitude
        type
        zoom
        markers {
          marker
          latitude
          longitude
          description
        }
      }
      image
      embed
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

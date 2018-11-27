import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { aliasTranslatedFields } from '../helpers/language'

export default ({ subcontinentTitle, language }) => (
  <StaticQuery
    query={graphql`
      query CountriesInSubContinents {
        allCountriesYaml {
          edges {
            node {
              nameEn
              nameFr
              fields {
                slugFr
                slugEn
              }
              subcontinent {
                title
              }
            }
          }
        }
      }
    `}
    render={data => (
      <ul>
        {data.allCountriesYaml.edges
          .filter(x => x.node.subcontinent.title === subcontinentTitle)
          .map(x => aliasTranslatedFields(x.node, language))
          .map(x => (
            <li>
              <Link to={x.fields.slug}>{x.name}</Link>
            </li>
          ))}
      </ul>
    )}
  />
)

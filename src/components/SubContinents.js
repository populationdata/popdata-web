import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import CountriesInSubContinents from './CountriesInSubContinents'
import { aliasTranslatedFields } from '../helpers/language'

export default ({ continentTitle, language }) => (
  <StaticQuery
    query={graphql`
      query SubContinents {
        allSubcontinentsYaml {
          edges {
            node {
              nameFr
              nameEn
              title
              continent {
                title
              }
            }
          }
        }
      }
    `}
    render={data => (
      <ul>
        {data.allSubcontinentsYaml.edges
          .filter(x => x.node.continent.title === continentTitle)
          .map(x => aliasTranslatedFields(x.node, language))
          .map(x => (
            <li>
              {x.name}
              <CountriesInSubContinents
                subcontinentTitle={x.title}
                language={language}
              />
            </li>
          ))}
      </ul>
    )}
  />
)

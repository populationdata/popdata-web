import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import CountriesInSubContinents from './CountriesInSubContinents'

export default ({ continentTitle }) => (
  <StaticQuery
    query={graphql`
      query SubContinents {
        allSubcontinentsYaml {
          edges {
            node {
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
          .map(x => x.node)
          .map(x => (
            <li>
              {x.title}
              <CountriesInSubContinents subcontinentTitle={x.title} />
            </li>
          ))}
      </ul>
    )}
  />
)

import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

export default ({ subcontinentTitle }) => (
  <StaticQuery
    query={graphql`
      query CountriesInSubContinents {
        allCountriesYaml {
          edges {
            node {
              fields {
                name
                slug
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
          .map(x => x.node)
          .map(x => (
            <li>
              <Link to={x.fields.slug}>{x.fields.name}</Link>
            </li>
          ))}
      </ul>
    )}
  />
)

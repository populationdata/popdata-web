import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import ColBlockItems from '../components/ColBlockItems'
import ColBlock from '../components/ColBlock'

const allLabels = {
  fr: {
    colCountries: 'Fiches pays',
    colRankings: 'Palmarès',
  },
  en: {
    colCountries: 'Country profiles',
    colRankings: 'Rankings',
  },
}

const labels = allLabels[process.env.GATSBY_LANGUAGE]

const HomePage = ({ data }) => (
  <Layout
    col1={[
      <ColBlockItems
        key="col-country"
        title={labels.colCountries}
        items={data.continents.edges.map(x => x.node.fields)}
      />,
      <ColBlock key="col-rankings" title={labels.colRankings} />,
    ]}
  >
    <ul>
      {data.posts.edges
        .map(x => x.node)
        .map(post => (
          <li key={post.id}>
            <Link to={post.fields.slug}>{post.fields.title}</Link>
          </li>
        ))}
    </ul>
  </Layout>
)

export default HomePage

export const homeQuery = graphql`
  query Home($skip: Int!, $limit: Int!) {
    continents: allContinentsYaml(sort: { fields: [fields___name] }) {
      edges {
        node {
          fields {
            link: slug
            title: name
          }
        }
      }
    }
    posts: allPostsYaml(
      sort: { fields: date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          fields {
            slug
            title
            body
          }
        }
      }
    }
  }
`

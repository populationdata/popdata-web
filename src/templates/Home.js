import React from 'react'
import { css } from 'glamor'
import { graphql, Link } from 'gatsby'
import { Button } from 'reactstrap'

import Layout from '../components/Layout'
import ColBlockItems from '../components/ColBlockItems'
import ColBlock from '../components/ColBlock'

const allLabels = {
  fr: {
    colCountries: 'Fiches pays',
    colRankings: 'Palmarès',
    next: 'Articles suivants',
    previous: 'Articles précédents',
    readNext: 'Lire la suite',
  },
  en: {
    colCountries: 'Country profiles',
    colRankings: 'Rankings',
    next: 'Next articles',
    previous: 'Previous articles',
    readNext: 'Read the rest of this entry',
  },
}

const labels = allLabels[process.env.GATSBY_LANGUAGE]

const articleCss = css({
  borderBottom: '1px solid #e9e9e9',
  marginBottom: 20,
  paddingBottom: 20,
  '& h2 a': {
    textDecoration: 'none',
    color: '#333333',
    lineHeight: 1.35,
  },
})

const articleImgCss = css({
  textAlign: 'center',
})

const sectionLinkCss = css({
  textAlign: 'center',
})

const PostSummary = ({ post }) => (
  <article {...articleCss}>
    <h2>
      <Link to={post.fields.slug}>{post.fields.title}</Link>
    </h2>
    {post.image && (
      <div {...articleImgCss}>
        <img className="img-fluid" src={post.image} alt={post.fields.title} />
      </div>
    )}
    <p>{post.excerpt}</p>
    <div>
      <Link to={post.fields.slug}>{labels.readNext}</Link>
    </div>
  </article>
)

const HomePage = ({ pageContext: { index, totalPages }, data }) => (
  <Layout
    col1={[
      <ColBlockItems
        key="col-country"
        title={labels.colCountries}
        items={data.continents.edges.map(x => x.node.fields)}
      />,
      <ColBlock key="col-rankings" title={labels.colRankings} />,
    ]}
    col2={[<ColBlock key="follow-us" title="Suivez-nous" />]}
  >
    <section>
      {data.posts.edges
        .map(x => x.node)
        .map(post => (
          <PostSummary key={post.id} post={post} />
        ))}
    </section>
    <section {...sectionLinkCss}>
      <ul className="list-inline">
        {index !== 0 && (
          <li className="list-inline-item">
            <Button
              tag={Link}
              to={index === 1 ? `/` : `/page/${index}`}
              color="secondary"
            >
              {labels.previous}
            </Button>
          </li>
        )}
        {index !== totalPages && (
          <li class="list-inline-item">
            <Button tag={Link} to={`/page/${index + 2}`} color="primary">
              {labels.next}
            </Button>
          </li>
        )}
      </ul>
    </section>
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
          }
          image
          excerpt
        }
      }
    }
  }
`

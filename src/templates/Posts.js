import React from 'react'
import { css } from 'glamor'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

const contentCss = css({
  '& img': {
    height: 'auto',
    maxWidth: '100%',
  },
})

const PostPage = ({ data }) => {
  return (
    <Layout>
      <h1>{data.post.fields.title}</h1>
      <section>
        <HTMLContent {...contentCss} content={data.post.fields.body} />
      </section>
    </Layout>
  )
}

export default PostPage

export const mapQuery = graphql`
  query PostByID($id: String!) {
    post: postsYaml(id: { eq: $id }) {
      fields {
        title
        body
      }
    }
  }
`

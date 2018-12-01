import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

const PostPage = ({ data }) => {
  return (
    <Layout>
      <h1>{data.post.fields.title}</h1>
      <section>
        <HTMLContent content={data.post.fields.body} />
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

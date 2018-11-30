import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

const PostPage = ({ data }) => {
  const post = data.postsYaml

  return (
    <Layout>
      <h1>{post.fields.name}</h1>
      <section>
        <HTMLContent content={post.bodyFr} />
      </section>
    </Layout>
  )
}

export default PostPage

export const mapQuery = graphql`
  query PostByID($id: String!) {
    postsYaml(id: { eq: $id }) {
      bodyFr
      fields {
        name
      }
    }
  }
`

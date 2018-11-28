import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { aliasTranslatedFields } from '../helpers/language'
import { HTMLContent } from '../components/Content'

const PostPage = ({ data, pageContext }) => {
  const post = aliasTranslatedFields(data.postsYaml, pageContext.language)

  return (
    <Layout>
      <h1>{post.name}</h1>
      <section>
        <HTMLContent content={post.body} />
      </section>
    </Layout>
  )
}

export default PostPage

export const mapQuery = graphql`
  query PostByID($id: String!) {
    postsYaml(id: { eq: $id }) {
      id
      bodyFr
      nameFr
      nameEn
      title
    }
  }
`

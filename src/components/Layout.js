import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Header from './Header'
import Footer from './Footer'

import './Layout.scss'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            language
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet title={data.site.siteMetadata.title}>
          <html lang={data.site.siteMetadata.language} />
        </Helmet>
        <Header siteMetadata={data.site.siteMetadata} />
        <section className="container">{children}</section>
        <Footer />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

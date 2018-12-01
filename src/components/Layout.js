import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { css } from 'glamor'
import { Container, Row, Col } from 'reactstrap'
import { StaticQuery, graphql } from 'gatsby'
import Header from './Header'
import Footer from './Footer'

import './Layout.scss'

const Layout = ({ children, col1, col2 }) => (
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
        <Container
          {...css({
            marginTop: '25px',
          })}
        >
          <Row>
            <Col xl="7">{children}</Col>
            <Col
              {...css({
                borderLeft: '1px solid rgb(233, 233, 233)',
              })}
              className="d-none d-xl-block"
              xl="2"
            >
              {col1}
            </Col>
            <Col
              {...css({
                borderLeft: '1px solid rgb(233, 233, 233)',
              })}
              xl="3"
            >
              {col2}
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  col1: PropTypes.node,
  col2: PropTypes.node,
}

export default Layout

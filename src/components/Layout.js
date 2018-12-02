import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { css } from 'glamor'
import { Container, Row, Col } from 'reactstrap'
import { StaticQuery, graphql } from 'gatsby'
import Header from './Header'
import Footer from './Footer'

import './Layout.scss'
import favicon from '../images/favicon.png'

const mainColSize = (col1, col2) => {
  if (col1) {
    if (col2) {
      return 7
    }
    return 10
  }

  if (col2) {
    return 9
  }
  return 12
}

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
          <link href={favicon} rel="icon" />
        </Helmet>
        <Header siteMetadata={data.site.siteMetadata} />
        <Container
          {...css({
            marginTop: '25px',
          })}
        >
          <Row>
            <Col xl={mainColSize(col1, col2)}>{children}</Col>
            {!!col1 && (
              <Col
                {...css({
                  borderLeft: '1px solid rgb(233, 233, 233)',
                })}
                className="d-none d-xl-block"
                xl="2"
              >
                {col1}
              </Col>
            )}
            {!!col2 && (
              <Col
                {...css({
                  borderLeft: '1px solid rgb(233, 233, 233)',
                })}
                xl="3"
              >
                {col2}
              </Col>
            )}
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

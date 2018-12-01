import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import LogoFr from '../images/fr/populationdata-logo.png'
import LogoFrRetina from '../images/fr/populationdata-logo@2x.png'
import LogoEn from '../images/en/populationdata-logo.png'
import LogoEnRetina from '../images/en/populationdata-logo@2x.png'

const Header = ({ siteMetadata }) => {
  const logo = siteMetadata.language === 'fr' ? LogoFr : LogoEn
  const logoRetina =
    siteMetadata.language === 'fr' ? LogoFrRetina : LogoEnRetina
  return (
    <header>
      <Container>
        <Row>
          <Col>
            <img
              src={logo}
              srcset={`${logo} 1x, ${logoRetina} 2x`}
              alt={siteMetadata.title}
            />
          </Col>
          <Col />
        </Row>
      </Container>
    </header>
  )
}

export default Header

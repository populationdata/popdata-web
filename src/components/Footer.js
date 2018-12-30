import React from 'react'
import { css } from 'glamor'
import { Container, Row, Col } from 'reactstrap'

const allLabels = {
  fr: {
    about: 'À propos',
    aboutText: `Informations, cartes et statistiques sur les populations et les pays du monde. Ce site est le fruit d'une passion : les Humains et la Terre. Notre vocation est d'informer les internautes sur le monde et les populations qui y vivent, par le biais de fiches pays synthétiques, de statistiques, de cartes d'actualités, d'articles ponctuels, le tout dans divers domaines touchant l'humanité.`,
    contactUs: 'Nous contacter',
    friends: 'Sites amis et partenaires',
    otherSites: 'Nos autres sites',
  },
  en: {
    about: 'About',
    aboutText: `Informations, maps and statistics of the populations and countries of the World. This website is the result of a passion: Humans and the Earth. Our vocation is to inform users about the World and the people who live there, through synthetic country profiles sheets, various statistics, thematic maps and news, ad hoc articles, all in various fields related to humanity and our planet.`,
    contactUs: 'Contact us',
    friends: 'Friends and partners',
    otherSites: 'Our other sites',
  },
}

const labels = allLabels[process.env.GATSBY_LANGUAGE]

const footerCss = css({
  borderTop: '10px solid #e9e9e9',
  marginBottom: 20,
  paddingTop: 30,
})

const columnStyle = css({
  fontSize: 13,
  '& h6': {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
})

const bottomCss = css({
  borderTop: '1px solid #e9e9e9',
  fontSize: 12,
  padding: '20px 0',
  '& p': {
    width: '100%',
  },
})

const Footer = () => (
  <footer>
    <Container>
      <Row {...footerCss}>
        <Col {...columnStyle}>
          <h6>{labels.about}</h6>
          <p>{labels.aboutText}</p>
        </Col>
        <Col {...columnStyle}>
          <h6>{labels.otherSites}</h6>
        </Col>
        <Col {...columnStyle}>
          <h6>{labels.friends}</h6>
        </Col>
      </Row>
      <Row {...bottomCss}>
        <p className="text-right">
          <a
            href="https://creativecommons.org/licenses/by-nc/2.5/ca/"
            rel="license"
          >
            <img
              src="https://i.creativecommons.org/l/by-nc/2.5/ca/80x15.png"
              alt="Creative Commons License"
            />
          </a>{' '}
          Creative Commons 2002 - {new Date().getFullYear()} - ISSN 1708-5713
        </p>
      </Row>
    </Container>
  </footer>
)

export default Footer

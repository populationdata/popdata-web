import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { css } from 'glamor'
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  UncontrolledDropdown,
} from 'reactstrap'

const allLabels = {
  fr: {
    home: 'Accueil',
    world: 'Monde - fiches pays',
  },
  en: {
    home: 'Home',
    world: 'World - Country profiles',
  },
}

const labels = allLabels[process.env.GATSBY_LANGUAGE]

const menuTitleCss = css({
  color: 'rgb(51, 51, 51)',
  fontWeight: '700',
  textTransform: 'uppercase',
})

const menuItemCss = css({
  color: 'rgb(51, 51, 51)',
  fontSize: '12px',
  textTransform: 'uppercase',
})

class HeaderMenu extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const { continents } = this.props
    return (
      <div
        {...css({
          borderBottom: '1px solid rgb(233, 233, 233)',
          borderTop: '2px solid rgb(51,51,51)',
        })}
      >
        <Navbar
          {...css({
            fontSize: '12px',
          })}
          expand="md"
        >
          <Nav className="border-right mr-auto">
            <Link
              {...css(
                {
                  paddingRight: '16px',
                },
                menuTitleCss
              )}
              to="/"
            >
              {labels.home}
            </Link>
          </Nav>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle
                  {...css(menuTitleCss)}
                  className="border-right"
                  nav
                  caret
                >
                  {labels.world}
                </DropdownToggle>
                <DropdownMenu>
                  {continents.map((continent, i, arr) => (
                    <React.Fragment key={continent.slug}>
                      <DropdownItem>
                        <Link {...css(menuItemCss)} to={continent.slug}>
                          {continent.name}
                        </Link>
                      </DropdownItem>
                      {arr.length - 1 !== i && <DropdownItem divider />}
                    </React.Fragment>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

const HeaderMenuQuery = () => (
  <StaticQuery
    query={graphql`
      query HeaderMenu {
        continents: allContinentsYaml(sort: { fields: [fields___name] }) {
          edges {
            node {
              fields {
                slug
                name
              }
            }
          }
        }
      }
    `}
    render={data => (
      <HeaderMenu continents={data.continents.edges.map(x => x.node.fields)} />
    )}
  />
)

export default HeaderMenuQuery

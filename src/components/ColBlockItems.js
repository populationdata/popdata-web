import React from 'react'
import { Link } from 'gatsby'
import { css } from 'glamor'
import PropTypes from 'prop-types'
import { Nav, NavItem } from 'reactstrap'
import ColBlock from './ColBlock'

const ColBlockItems = ({ title, items }) => (
  <ColBlock title={title}>
    <Nav vertical>
      {items.map(item => (
        <NavItem
          key={item.link}
          {...css({
            borderBottom: '1px solid rgb(233, 233, 233)',
            padding: '15px 0',
          })}
        >
          <Link to={item.link}>{item.title}</Link>
        </NavItem>
      ))}
    </Nav>
  </ColBlock>
)

ColBlockItems.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array,
}

export default ColBlockItems

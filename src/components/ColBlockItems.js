import React from 'react'
import { Link } from 'gatsby'
import { css } from 'glamor'
import PropTypes from 'prop-types'
import ColBlock from './ColBlock'

const ColBlockItems = ({ title, items }) => {
  return (
    <ColBlock title={title}>
      <ul
        {...css({
          listStyleType: 'none',
          padding: '0',
        })}
      >
        {items.map(item => (
          <li
            key={item.link}
            {...css({
              borderBottom: '1px solid rgb(233, 233, 233)',
              padding: '15px 0',
            })}
          >
            <Link to={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </ColBlock>
  )
}

ColBlockItems.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array,
}

export default ColBlockItems

import React from 'react'
import { css } from 'glamor'
import PropTypes from 'prop-types'

const ColBlock = ({ title, children }) => {
  return (
    <aside
      {...css({
        marginBottom: '30px',
      })}
    >
      <h3
        {...css({
          backgroundColor: '#f0f0f0',
          fontSize: '12px',
        })}
      >
        <span
          {...css({
            backgroundColor: '#fff',
            fontWeight: 'bold',
            paddingRight: '10px',
          })}
        >
          {title.toLocaleUpperCase()}
        </span>
      </h3>
      <div>{children}</div>
    </aside>
  )
}

ColBlock.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default ColBlock

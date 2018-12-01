import React from 'react'
import { css } from 'glamor'
import { Row } from 'reactstrap'

const HeaderMenu = () => {
  return (
    <Row
      {...css({
        borderBottom: '1px solid rgb(233, 233, 233)',
        borderTop: '2px solid rgb(51,51,51)',
        height: '46px',
      })}
    />
  )
}

export default HeaderMenu

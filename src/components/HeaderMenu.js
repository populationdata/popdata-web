import React from 'react'
import { css } from 'glamor'
import { Row } from 'reactstrap'

const HeaderMenu = () => {
  return (
    <Row
      {...css({
        'border-bottom': '1px solid rgb(233, 233, 233)',
        'border-top': '2px solid rgb(51,51,51)',
        height: '46px',
      })}
    />
  )
}

export default HeaderMenu

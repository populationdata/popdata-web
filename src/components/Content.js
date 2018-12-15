import React from 'react'

export const HTMLContent = ({ content, ...other }) => (
  <div {...other} dangerouslySetInnerHTML={{ __html: content }} />
)

export const Content = ({ content, ...other }) => (
  <div {...other}>{content}</div>
)

import React from 'react'

const withClientOnly = WrappedComponent => {
  return class extends React.Component {
    render() {
      if (typeof window !== `undefined`) {
        return <WrappedComponent {...this.props} />
      } else {
        return false
      }
    }
  }
}

export default withClientOnly

import React, { Component } from 'react'

class TypingIndicator extends Component {
  render() {
    if (this.props.usersTypingCurrently.length > 0) {
      return (
        <div>
          {`${this.props.usersTypingCurrently
            .slice(0, 2)
            .join(' and ')} is typing`}
        </div>
      )
    }
    return <div />
  }
}

export default TypingIndicator

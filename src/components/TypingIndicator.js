import React, { Component } from 'react'
import { Label, Icon } from 'semantic-ui-react'

class TypingIndicator extends Component {
  render() {
    if (this.props.usersTypingCurrently.length > 0) {
      return (
        <Label color='orange' ribbon>
          <Icon name='ellipsis horizontal' />
          {`${this.props.usersTypingCurrently
            .slice(0, 2)
            .join(' and ')} is typing`}
        </Label>
      )
    }
    return null  }
}

export default TypingIndicator

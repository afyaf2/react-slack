import React from 'react'
import { Message } from 'semantic-ui-react'

function UserMessage(props) {
  return (
    <Message compact floating
      header={props.username}
      content={props.text}
      size="small"
    />
  )
}

export default UserMessage


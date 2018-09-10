import React from 'react'

function Message(props) {
  return (
    <div className="message">
      <div className="message-sender">{props.username}</div>
      <div className="message-text">{props.text}</div>
    </div>
  )
}

export default Message

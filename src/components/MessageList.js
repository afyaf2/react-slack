import React from 'react'
import Message from './Message'

class MessageList extends React.Component {

  render() {
    return (
        <ul>
          {this.props.messages.map((message, index) => {
            return (
              <div className='message-list'>
                <Message key={message.id} username={message.senderId} text={message.text} />
              </div>
            )
          })}
        </ul>
    )
  }
}

export default MessageList

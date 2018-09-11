import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'

class MessageList extends React.Component {

  componentWillUpdate() {
    // check if client is reading earlier messages

    const node = ReactDOM.findDOMNode(this)
    this.scrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
  }

  componentDidUpdate() {
    // scroll to bottom ^^ only if we arent reading top

    if (this.scrollToBottom) {
      const node = ReactDOM.findDOMNode(this)
      node.scrollTop = node.scrollHeight
    }
  }

  render() {

    // render prompt for user to join room if they havent

    if (!this.props.roomId) {
      return (
         <div className="message-list">
            <div className="join-room">
                &larr; Join a room!
            </div>
        </div>
      )
    }

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

 import React from 'react'
 import Chatkit from '@pusher/chatkit'
 import MessageList from './components/MessageList'

 class ChatScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      messages: [],
    }
  }

  // connect componenet to chatkit API with npm
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:1c13b3f2-e119-4f5b-87be-54c0dd3d6e74',
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/1c13b3f2-e119-4f5b-87be-54c0dd3d6e74/token'
      })
    })

    chatManager
      .connect()
      .then(currentUser => {
        return currentUser.subscribeToRoom({
          roomId: 15866294,
          messageLimit: 100,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          }
        })
      }).then(CurrentRoom => {})
      .catch(error => console.log('error', error))
  }


  render() {
    return (
      <MessageList messages={this.state.messages} />
    )
  }
 }

export default ChatScreen

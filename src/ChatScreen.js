import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import RoomList from './components/RoomList'

 class ChatScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      messages: [],
      currentRoom: {},
      currentUser: {},
      joinableRooms: [],
      joinedRooms: [],
      usersTypingCurrently: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.sendTypingEvent = this.sendTypingEvent.bind(this)
    this.subscribetoroom = this.subscribetoroom.bind(this)
  }

  // connect component to chatkit API with npm on load
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
        this.currentUser = currentUser
        // display list of joinable rooms
        this.currentUser.getJoinableRooms()
        .then(joinableRooms => {
          this.setState({
            joinableRooms,
            joinedRooms: currentUser.rooms
          })
        })
        .catch(error => console.log('error on joined/able rooms', error))
        this.subscribetoroom()
      })
      .catch(error => console.log('error on connecting', error));
    }
  // create subscribetoroom() method so multiple rooms are joinable

  subscribetoroom() {
    this.currentUser.subscribeToRoom({
      roomId: 15866294,
      messageLimit: 100,
      hooks: {
        onNewMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        },
      // add hook to show other users typing
        onUserStartedTyping: user => {
          this.setState({
            usersTypingCurrently: [...this.state.usersTypingCurrently, user.name]
          })
        },
        onUserStoppedTyping: user => {
          this.setState({
            usersTypingCurrently: this.state.usersTypingCurrently.filter(
              username => username !== user.name
            )
          })
        },
      }
    })
    .then(currentRoom => {
    this.setState({currentRoom})
    })
  }

  // send message to chatkitAPI on form submission

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id,
    })
  }

  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({roomId: this.state.currentRoom.id})
      .catch(error => console.log('error', error))
  }

  render() {
    return (
      <div>
      <RoomList rooms={[...this.state.joinableRooms, this.state.joinedRooms]} />
      <MessageList messages={this.state.messages} />
      <TypingIndicator usersTypingCurrently={this.state.usersTypingCurrently} />
      <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent}/>
      </div>
    )
  }
 }

export default ChatScreen

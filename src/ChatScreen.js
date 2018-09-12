import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'
import { Container, Grid, Segment } from 'semantic-ui-react'

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
    this.getRooms = this.getRooms.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.createRoom =this.createRoom.bind(this)
  }

  // connect component to chatkit API on mount
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:d0508140-8047-4c95-a45a-1620477f8336',
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/d0508140-8047-4c95-a45a-1620477f8336/token'
      })
    })

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser
        // display list of joinable rooms
        this.getRooms()
      })
      .catch(error => console.log('error on connecting', error));
    }

  // create subscribetoroom() method so multiple rooms are joinable
  subscribeToRoom(roomId) {
    this.setState({ messages: [] })
    this.currentUser.subscribeToRoom({
      roomId: roomId,
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
      this.getRooms()
    })
  }

  // get list of joinable rooms
  getRooms() {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
    })
    .catch(error => console.log('error on joined/able rooms', error))
  }

  // create a new room using NewRoomForm
  createRoom(name) {
    this.currentUser.createRoom({
      name,
    }).then(room => {
      this.subscribeToRoom(room.id)
    }).catch(error => {
      console.log('error on room creation ', error)
    })
  }

  // send message to chatkitAPI on form submission
  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id,
    })
  }

  // log a typing event for typing notification
  sendTypingEvent() {
    this.currentUser
      .isTypingIn({roomId: this.state.currentRoom.id})
      .catch(error => console.log('error', error))
  }

  render() {
    return (
      <div>
        <Container>
        <Segment padded raised>
          <Grid columns={2} divided>
            {/* roomlist and messages row */}
            <Grid.Row>
              <Grid.Column width={4}>
                <RoomList
                  roomId={this.state.currentRoom}
                  subscribeToRoom={this.subscribeToRoom}
                  rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
              </Grid.Column>
              <Grid.Column width={12}>
                <MessageList
                roomId={this.state.currentRoom}
                messages={this.state.messages} />
              </Grid.Column>
            </Grid.Row>

          {/* user inputs row */}
            <Grid.Row>
              <Grid.Column width={4}>
              <NewRoomForm createRoom={this.createRoom} />
              </Grid.Column>
              <Grid.Column width={12}>
              <TypingIndicator usersTypingCurrently={this.state.usersTypingCurrently} />
              <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          </Segment>
        </Container>
      </div>
    )
  }
 }

export default ChatScreen

import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm'
import ChatScreen from './ChatScreen'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentScreen: 'WhatIsYourUsernameScreen',
      currentUsername: ''

    }
    this.onUserNameSubmission = this.onUserNameSubmission.bind(this)
  }

  onUserNameSubmission(username) {
    fetch('https://react-slack-chat-app.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
    .then(response => {
      this.setState({
        currentUsername: username,
        currentScreen: 'ChatScreen'
      })
    }).catch(error => {
      console.log(error)
    })
  }


  render() {
    if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
      return (
        <UsernameForm onSubmit={this.onUserNameSubmission} />
      );
    } else if (this.state.currentScreen === 'ChatScreen') {
      return (
        <ChatScreen currentUsername={this.state.currentUsername} />
      )
    }
  }
}

export default App

import React from 'react'
import { Form, Input } from 'semantic-ui-react'


class NewRoomForm extends React.Component {

  constructor() {

    super()
    this.state = {
      roomName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      roomName: e.target.value
    })

  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.createRoom(this.state.roomName)
    this.setState({ roomName: ''})
  }

  render () {
    return (
    <div>
      <Form onSubmit={this.handleSubmit}>
      <Input fluid transparent
          action={{color:'teal', content:'Add'}}
          value={this.state.roomName}
          onChange={this.handleChange}
          type="text"
          placeholder="Add a new room"
          required />
      </Form>
    </div>
    )
  }
}

export default NewRoomForm

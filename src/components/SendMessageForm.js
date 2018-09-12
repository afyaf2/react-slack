import React from 'react'
import { Input } from 'semantic-ui-react'

class SendMessageForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleSubmit= this.handleSubmit.bind(this)
  }

  handleFormChange(e) {
    this.setState({
      text: e.target.value
    });
    if (this.props.onChange) {
      this.props.onChange()
    }
    this.props.onChange()
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.text)
    this.setState({text:''})
  }
    render() {
    const placeholderText = this.props.disabled ? "Join a room to send a message!" : "Type your message here";

      return (
        <form className="send-message-form" onSubmit={this.handleSubmit}>
          <Input focus fluid
            onChange={this.handleFormChange}
            placeholder="Type your message here..."
            disabled={this.props.disabled}
            onChange={this.handleFormChange}
            placeholder={placeholderText}
            type="text"
            value={this.state.text} />
        </form>
      )
    }
  }

  export default SendMessageForm

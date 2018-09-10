import React from 'react'

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
      return (
        <form className="send-message-form" onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleFormChange}
            placeholder="Type your message here"
            type="text"
            value={this.state.text} />
        </form>
      )
    }
  }

  export default SendMessageForm

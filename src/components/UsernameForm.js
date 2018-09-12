import React from 'react'
import { Button, Container, Label, Header, Icon, Input, Segment } from 'semantic-ui-react'

class UsernameForm extends React.Component {
  constructor(props) {
    super(props)
     this.state = {
      username: ''
     }
     this.onChange = this.onChange.bind(this);
     this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.username)
  }


  render() {
    return (
      <div className="username-form">
        <Container textAlign="center" fluid>
          <form className="u-form-group" style={{width: "350px", padding: "10px"}} onSubmit={this.onSubmit}>
          <Segment padded raised>
            <Header as="h2"> Welcome to React.chat! </Header>
              <Input
                action={{ color: 'teal', labelPosition: 'right', icon: 'hand peace outline', content: 'JOIN', type:'submit' }}
                placeholder='Choose your username' onChange={this.onChange} type='text'
              />
              <Label
              circular
              floating
              as='a'
              href='https://github.com/afyaf2'
              target='_blank'
              size='large'
              color='orange'
              >
              <Icon fitted name='github' />
              </Label>
          </Segment>
          </form>
        </Container>
      </div>
    )
  }
}

export default UsernameForm

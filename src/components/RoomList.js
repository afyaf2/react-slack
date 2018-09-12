import React from 'react'
import { List, Header, Icon } from 'semantic-ui-react'

class RoomList extends React.Component {
  render() {

    const orderedRooms = [...this.props.rooms].sort((a,b) => a.id - b.id)
    return (
      <List selection verticalAlign="middle" className="room-list">
        <Header as="h3">
          <Icon name="chevron down" verticalAlign="middle" />
          <Header.Content>Available Rooms: </Header.Content>
        </Header>
        {orderedRooms.map(room => {
        const active = this.props.roomId.id === room.id ? 'active' : '';
          return (
              <List.Item
              key={room.id}
              as='a'
              onClick={() => this.props.subscribeToRoom(room.id)}
              href='#'
              className={'tab-' + active}
              >
              <List.Icon
              name='sign-in alternate'
              size='large'
              verticalAlign='middle'
              className={'icon-' + active}
              />
              <List.Content className={'content-' + active}> {room.name} </List.Content>
              </List.Item>
          )
        })}
      </List>
    )
  }
}


export default RoomList

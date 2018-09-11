import React from 'react'

class RoomList extends React.Component {
  render() {
    return (
      <div className="room-list">
        <div className="room-name">
        <h3>Rooms:</h3>
        {this.props.rooms.map(room => {
          return (
            <li key={room.id} className="room">
              <a href='#'>{room.name}</a>
            </li>
          )
        })}
        </div>
      </div>
    )
  }
}


export default RoomList

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
            {/* USED ANON FUNCTION TO AVOID FUNCTION CALL ON RENDER */}
              <a
                onClick={() => this.props.subscribeToRoom(room.id)}
                href='#'>{room.name}
              </a>
            </li>
          )
        })}
        </div>
      </div>
    )
  }
}


export default RoomList

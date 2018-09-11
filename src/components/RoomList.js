import React from 'react'

class RoomList extends React.Component {
  render() {

    const orderedRooms = [...this.props.rooms].sort((a,b) => a.id - b.id)
    return (
      <div className="room-list">
        <div className="room-name">
        <h3>Rooms:</h3>
        {orderedRooms.map(room => {
        const active = this.props.roomId === room.id ? "active" : ""
          return (
            <li key={room.id} className={"room " + active}>

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

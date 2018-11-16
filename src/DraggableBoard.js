
import React from 'react'
import Board from './Board'
import { Draggable } from 'react-beautiful-dnd'

const DraggableBoard = props => {
  return (
    <Draggable
      draggableId={props.id + ''}
      index={props.index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            outline: 'none'
          }}
        >
          <Board {...props} />
        </div>
      )}
    </Draggable>
  )
}

export default DraggableBoard


import React, { useState } from 'react';
import DraggableBoard from './DraggableBoard'
import Input from './Input'
import styled from 'styled-components'
import HorizontalContainer from './HorizontalContainer'
import Button from './Button'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { connect } from 'react-redux'
import {
  addBoard,
  moveItem,
  moveBoard
} from './actions'

const AppContainer = styled.div`
  display: inline-block;
  padding: 40pt;
  display: flex;
  flex-direction: column;
  margin: 20pt;
`

const onBeforeDragStart = () => {}
const onDragStart = () => {}
const onDragUpdate = () => {}

const App = props => {
  const [newBoardName, setNewBoardName] = useState('')

  const boards = props.boards && props.boards.map((b, index) => (
    <DraggableBoard
      index={index}
      key={b.id}
      id={b.id}
      items={b.items}
      title={b.title}
    />
  ))

  const addBoard = () => {
    props.addBoard(newBoardName)
    setNewBoardName('')
  }

  const onDragEnd = result => {
    if (!result.destination) { return }

    if (result.type === 'ITEM') {
      props.moveItem(result.source, result.destination)      
    }

    if (result.type === 'BOARD') {
      props.moveBoard(result.source.index, result.destination.index)
    }
  }

  return (
    <DragDropContext
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <AppContainer>
        <HorizontalContainer>
          <Input
            value={newBoardName}
            placeholder='Board name'
            onChange={e => setNewBoardName(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && addBoard()}
          />
            <div style={{marginTop: '50pt'}} />
            <Button
              onClick={addBoard}
            >
              Add board
            </Button>
        </HorizontalContainer>
        <Droppable
          droppableId={props.id + ''}
          type="BOARD"
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: 'auto',
              }}
              {...provided.droppableProps}
            >
              { boards }
              { provided.placeholder }
            </div>
          )}
          </Droppable>
      </AppContainer>
    </DragDropContext>
  )
}

export default connect(
  state => ({ boards: state.boards }),
  dispatch => ({
    addBoard: name => dispatch(addBoard(name)),
    moveItem: (from, to) => dispatch(moveItem(from, to)),
    moveBoard: (from, to) => dispatch(moveBoard(from, to))
  })
)(App);

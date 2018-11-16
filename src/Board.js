
import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Input from './Input'
import Button from './Button'
import Item from './Item'
import { Droppable } from 'react-beautiful-dnd'

import { connect } from 'react-redux'
import {
  renameBoard,
  addItem,
  removeBoard
} from './actions'

const StyledBoard = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20pt;
  margin-right: 10pt;
  width: 200pt;
  height: 400pt;
  border: 1pt solid lightgray;
  border-radius: 2pt;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  padding: 10pt;
  background: linear-gradient(to bottom right, white, #f0f0f0);
`

const Title = styled.input`
  align-self: flex-start;
  font-size: 16pt;
  text-align: center;
  border: none;
  border: ${p => p.disabled ? '1px solid transparent' : '1px dashed lightgray'};
  border-bottom: 1pt solid #aaa;
  box-sizing: border-box;
  padding-top: 10pt;
  padding-bottom: 18pt;
  height: 10pt;
  width: 200pt;
  color: #404040;
  background-color: inherit;
  outline: none;
`

const FooterContainer = styled.div`
  margin-top: auto;
`

const RemoveBoardButton = styled.div`
  position: absolute;
  margin-left: 185pt;
  margin-top: -5pt;
  font-size: 20pt;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #f88;
  }
`

const Board = props => {
  const [newItemName, setNewItemName] = useState('')
  const [editBoardNameMode, setEditBoardNameMode] = useState(false)
  const [newBoardName, setNewBoardName] = useState(props.title)

  const inputRef = React.createRef()

  const addItem = () => {
    props.addItem(newItemName)
    setNewItemName('')
  }

  const renameBoard = () => {
    props.renameBoard(newBoardName)
    setEditBoardNameMode(false)
  }

  useEffect(() => inputRef.current.focus(), [editBoardNameMode])

  const items = props.items && props.items.map((item, index) => (
    <Item
      key={item.id}
      id={item.id}
      index={index}
    >
      {item.title}
    </Item>
  ))

  return (
    <StyledBoard>
      <div
        onClick={() => !editBoardNameMode ? setEditBoardNameMode(true) : null}
      >
        <Title
          value={newBoardName}
          onChange={e => setNewBoardName(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && renameBoard()}
          disabled={!editBoardNameMode}
          innerRef={inputRef}
        />
      </div>
      <RemoveBoardButton
        onClick={props.removeBoard}
      >
        ⨯
      </RemoveBoardButton>
      <Droppable
        droppableId={props.id + ''}
        type='ITEM'
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '340pt',
              borderLeft: snapshot.isDraggingOver ? '1px dashed lightgray' : '1px dashed transparent',
              borderRight: snapshot.isDraggingOver ? '1px dashed lightgray' : '1px dashed transparent',
              borderBottom: snapshot.isDraggingOver ? '1px dashed lightgray' : '1px dashed transparent',
              backgroundColor: snapshot.isDraggingOver ? 'white' : 'inherit'
            }}
            {...provided.droppableProps}
          >
            { items }
            { provided.placeholder }
          </div>
        )}
      </Droppable>
      <FooterContainer>
        <Input
          value={newItemName}
          placeholder='Item name'
          onChange={e => setNewItemName(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && addItem()}
        />
        <Button
          onClick={addItem}
        >
          Add item
        </Button>
      </FooterContainer>
    </StyledBoard>
  )
}

export default connect(
  null,
  (dispatch, ownProps) => ({
    renameBoard: title => dispatch(renameBoard(ownProps.id, title)),
    addItem: title => dispatch(addItem(title, ownProps.id)),
    removeBoard: () => dispatch(removeBoard(ownProps.id))
  })
)(Board)


import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  removeItem,
  renameItem
} from './actions'
import { Draggable } from 'react-beautiful-dnd'
import HorizontalContainer from './HorizontalContainer'

const ItemContainer = styled.div`
  color: #404040;
  padding: 5pt;
  border-bottom: 1pt solid lightgray;
  background: linear-gradient(white, #f8f8f8);
  outline: none;
`

const Icon = styled.div`
  margin: 0px 5px;
  font-size: 15pt;
  cursor: ${p => p.cursor || 'inherit'};
  color: ${p => p.color || 'lightgray'};
  &:hover {
    color: ${p => p.hoverColor};
  };
`

const Text = styled.input`
  border: ${p => p.disabled ? '1px solid transparent' : '1px dashed lightgray'};
  background: transparent;
  outline: none;
`

const Item = props => {
  const [editItemNameMode, setEditItemNameMode] = useState(false)
  const [newItemName, setNewItemName] = useState(props.children)

  const inputRef = React.createRef()

  const renameItem = () => {
    props.renameItem(newItemName)
    setEditItemNameMode(false)
  }

  useEffect(() => inputRef.current.focus(), [editItemNameMode])

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
        >
          <ItemContainer
            style={{cursor: 'default'}}
          >
            <HorizontalContainer>
              <Icon
                cursor={snapshot.isDragging ? 'grabbing' : 'grab'}
                hoverColor='gray'
                color={snapshot.isDragging ? 'gray' : 'lightgray'}
              >
                ☰
              </Icon> 
              <Text
                innerRef={inputRef}
                value={newItemName}
                onChange={e => setNewItemName(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && renameItem()}
                disabled={!editItemNameMode}
              />
              <Icon
                hoverColor='#ada'
                cursor='pointer'
                onClick={() => !editItemNameMode ? setEditItemNameMode(true) : null}
              >
              ✎  
              </Icon>
              <Icon
                onClick={() => props.removeItem(props.id)}
                cursor='pointer'
                hoverColor='#f88'
              >
                🞩
              </Icon>
            </HorizontalContainer>  
          </ItemContainer>
        </div>
      )}
    </Draggable>
  )
}

export default connect(
  null,
  (dispatch, ownProps) => ({
    removeItem: id => dispatch(removeItem(id)),
    renameItem: title => dispatch(renameItem(ownProps.id, title))
  })
)(Item)

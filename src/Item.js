
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  removeItem,
} from './actions'
import { Draggable } from 'react-beautiful-dnd'

const ItemContainer = styled.div`
  color: #404040;
  padding: 5pt;
  border-bottom: 1pt solid lightgray;
`

const RemoveItemButton = styled.div`
  position: absolute;
  margin-top: -18pt;
  font-size: 17pt;
  margin-left: 175pt;
  cursor: pointer;
  color: lightgray;
  &:hover {
    color: #f88;
  }
`

const Item = props => {
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
          <ItemContainer>
            <span>
              {props.children}
            </span>
            <RemoveItemButton
              onClick={() => props.removeItem(props.id)}
            >
              🞩
            </RemoveItemButton>
          </ItemContainer>
        </div>
      )}
    </Draggable>
  )
}

export default connect(
  null,
  dispatch => ({
    removeItem: id => dispatch(removeItem(id))
  })
)(Item)

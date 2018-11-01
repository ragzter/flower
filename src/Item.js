
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  removeItem,
  moveItemToNextBoard
} from './actions'

const ItemContainer = styled.div`
  color: #404040;
  padding: 5pt;
  border-bottom: 1pt solid lightgray;
`

const MoveItemButton = styled.div`
  position: absolute;
  margin-top: -18pt;
  font-size: 20pt;
  margin-left: 175pt;
  cursor: pointer;
  color: gray;
  &:hover {
    color: black;
  }
`

const Item = props => {
  return (
    <ItemContainer>
      <span
        onClick={() => props.removeItem(props.id)}
        >
        {props.children}
      </span>
      <MoveItemButton
        onClick={() => props.moveItemToNextBoard(props.id)}
        >
        →
      </MoveItemButton>
    </ItemContainer>
  )
}

export default connect(
  null,
  dispatch => ({
    removeItem: id => dispatch(removeItem(id)),
    moveItemToNextBoard: id => dispatch(moveItemToNextBoard(id))
  })
)(Item)


import React, { useState } from 'react';
import styled from 'styled-components'
import Input from './Input'
import Button from './Button'
import Item from './Item'

import { connect } from 'react-redux'
import {
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
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  padding: 10pt;
  background: linear-gradient(to bottom right, white, #f0f0f0);
`

const Title = styled.div`
  align-self: flex-start;
  font-size: 16pt;
  text-align: center;
  border-bottom: 1pt solid gray;
  padding-bottom: 16pt;
  height: 10pt;
  width: 200pt;
  color: #404040;
`

const TitleEdit = styled.input`
  align-self: flex-start;
  font-size: 16pt;
  text-align: center;
  border-bottom: 1pt solid gray;
  padding-bottom: 16pt;
  height: 10pt;
  width: 200pt;
  color: #404040;
`

const FooterContainer = styled.div`
  margin-top: auto;
`

const RemoveBoardButton = styled.div`
  position: absolute;
  margin-left: 191pt;
  cursor: pointer;
  color: gray;
  &:hover {
    color: red;
  }
`

const Board = props => {
  const [newItemName, setNewItemName] = useState('')

  const addItem = () => {
    props.addItem(newItemName)
    setNewItemName('')
  }

  const items = props.items && props.items.map(item => (
    <Item key={item.id} id={item.id}>{item.title}</Item>
  ))

  return (
    <StyledBoard>
      <Title>
        {props.children}
      </Title>
      <RemoveBoardButton
        onClick={props.removeBoard}
      >
        X
      </RemoveBoardButton>
      { items }
      <FooterContainer>
        <Input
          value={newItemName}    
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
    addItem: title => dispatch(addItem(title, ownProps.id)),
    removeBoard: () => dispatch(removeBoard(ownProps.id))
  })
)(Board)

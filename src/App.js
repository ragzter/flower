
import React, { useState } from 'react';
import Board from './Board'
import Input from './Input'
import styled from 'styled-components'
import HorizontalContainer from './HorizontalContainer'
import Button from './Button'

import { connect } from 'react-redux'
import {
  addBoard
} from './actions'

const AppContainer = styled.div`
  display: inline-block;
  padding: 40pt;
  display: flex;
  flex-direction: column;
  margin: 20pt;
`

const App = props => {
  const [newBoardName, setNewBoardName] = useState('')

  const boards = props.boards && props.boards.map(b => (
    <Board key={b.id} id={b.id} items={b.items} title={b.title} />
  ))

  const addBoard = () => {
    props.addBoard(newBoardName)
    setNewBoardName('')
  }

  return (
    <AppContainer>
      <HorizontalContainer>
        <Input
          value={newBoardName}
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
      <HorizontalContainer>
        { boards }
      </HorizontalContainer>
    </AppContainer>
  )
}

export default connect(
  state => ({ boards: state.boards }),
  dispatch => ({ addBoard: name => dispatch(addBoard(name)) })
)(App);

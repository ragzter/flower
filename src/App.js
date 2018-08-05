
import React, { Component } from 'react';
import Board from './Board'
import Input from './Input'
import styled from 'styled-components'
import HorizontalContainer from './HorizontalContainer'
import Button from './Button'

import { connect } from 'react-redux'
import {
  addBoard,
  removeBoard
} from './actions'

const AppContainer = styled.div`
  padding: 20pt;
  display: flex;
  flex-direction: column;
  margin: 20pt;
  background-color: #f9e9da;
  border: 1px solid lightgray;
`

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      inputValue: ''
    }
  }

  handleClick = () => {
    this.props.addBoard(this.state.inputValue)
  }

  handleInputChange = e => {
    this.setState({
      inputValue: e.target.value
    })
  }

  removeBoard = id => {
    this.props.removeBoard(id)
  }

  render() {
    return (
      <AppContainer>
        <HorizontalContainer>
          <Input onChange={this.handleInputChange} />
          <Button
            onClick={this.handleClick}
            >
            Add board
          </Button>
        </HorizontalContainer>
        <HorizontalContainer>
          {
            this.props.boards ? this.props.boards.map((board, index) => {
              return (
                <Board
                  key={board.id}
                  id={board.id}
                  removeCallback={this.removeBoard}
                  />
              )
            }) : <div />
          }
        </HorizontalContainer>
      </AppContainer>
    );
  }
}

const mapStateToProps = state => ({
  boards: state.boards
})

const mapDispatchToProps = dispatch => ({
  addBoard: name => dispatch(addBoard(name)),
  removeBoard: id => dispatch(removeBoard(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

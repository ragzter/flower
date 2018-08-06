
import React from 'react';
import styled from 'styled-components'
import Input from './Input'
import Button from './Button'

import { connect } from 'react-redux'
import {
  addItem,
  removeItem,
  moveItemToNextBoard
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
  background: linear-gradient(white, #f8fff8);
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

const Item = styled.div`
  color: #404040;
  padding: 5pt;
  border-bottom: 1pt solid lightgray;
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

class Board extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      inputValue: ''
    }
  }

  removeItem = () => {
    this.props.removeCallback(this.props.id)
  }

  handleInputChange = e => {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.addItem()
    }
  }

  addItem = () => {
    this.props.addItem(this.state.inputValue)

    this.setState({
      inputValue: ''
    })
  }

  render () {
    return (
      <StyledBoard>
        <Title>{this.props.title}</Title>
        <RemoveBoardButton
          onClick={this.removeItem}
          >
          X
        </RemoveBoardButton>
        {
          this.props.items ? this.props.items.map((item, index) => {
            return (
              <Item
                key={item.id}
                >
                <span
                  onClick={() => this.props.removeItem(item.id) /* Refactor */}
                  >
                  {item.title}
                </span>
                <MoveItemButton
                  onClick={() => this.props.moveItemToNextBoard(item.id)}
                  >
                  →
                </MoveItemButton>
              </Item>
            )
          }) : <div />
        }
        <FooterContainer>
          <Input
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
          <Button
            onClick={this.addItem}
            >
            Add item
          </Button>
        </FooterContainer>
      </StyledBoard>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return state.boards.filter(board => board.id === ownProps.id)[0]
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addItem: title => dispatch(addItem(title, ownProps.id)),
  removeItem: id => dispatch(removeItem(id)),
  moveItemToNextBoard: id => dispatch(moveItemToNextBoard(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

// export default Board

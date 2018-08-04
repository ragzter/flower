
import React from 'react';
import styled from 'styled-components'
import Input from './Input'
import Button from './Button'

import { connect } from 'react-redux'
import {
  addItem
} from './actions'

const StyledBoard = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20pt;
  margin-right: 20pt;
  width: 200pt;
  height: 400pt;
  border: 1pt solid gray;
  border-radius: 10pt;
  padding: 10pt;
  background-color: white;
`

const Title = styled.div`
  align-self: flex-start;
  text-align: center;
  border-bottom: 1pt solid gray;
  padding-bottom: 10pt;
  height: 10pt;
  width: 200pt;
`

const Item = styled.div`
  padding: 5pt;
  border-bottom: 1pt solid lightgray;
`

const FooterContainer = styled.div`
  margin-top: auto;
`

const RemoveButton = styled.div`
  position: absolute;
  margin-left: 191pt;
  cursor: pointer;
`

class Board extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      inputValue: ''
    }
  }

  remove = () => {
    this.props.removeCallback(this.props.id)
  }

  handleInputChange = e => {
    this.setState({
      inputValue: e.target.value
    })
  }

  add = () => {
    this.props.addItem(this.state.inputValue)
  }

  render () {
    return (
      <StyledBoard>
        <Title>{this.props.title}</Title>
        <RemoveButton
          onClick={this.remove}
          >
          X
        </RemoveButton>
        {
          this.props.items.map((item, index) => {
            return (
              <Item
                key={item.id}
                >
                {item.title}
              </Item>
            )
          })
        }
        <FooterContainer>
          <Input onChange={this.handleInputChange} />
          <Button
            onClick={this.add}
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
  addItem: title => dispatch(addItem(title, ownProps.id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

// export default Board

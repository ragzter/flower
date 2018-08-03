
import React from 'react';
import styled from 'styled-components'
import Input from './Input'
import Button from './Button'

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
  handleClick = () => {
    this.props.removeCallback(this.props.id)
  }

  render () {
    return (
      <StyledBoard>
        <Title>{this.props.title}</Title>
        <RemoveButton
          onClick={this.handleClick}
          >
          X
        </RemoveButton>
        <Item>zzz</Item>
        <FooterContainer>
          <Input />
          <Button>
            Add item
          </Button>
        </FooterContainer>
      </StyledBoard>
    )
  }
}

export default Board

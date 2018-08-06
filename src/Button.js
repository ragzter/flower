
import React from 'react';
import styled from 'styled-components'

const StyledButton = styled.button`
  padding-left: 3pt;
  font-size: 13t;
  height: 20pt;
  border: 1px solid lightgray;
  background: linear-gradient(white, lightgray);
  outline: none;
  color: #404040;
  &:hover {
    background: linear-gradient(white, #d0ffd0);
  }
`

class Button extends React.Component {
  render () {
    return (
      <StyledButton {...this.props} />
    )
  }
}

export default Button


import React from 'react';
import styled from 'styled-components'

const StyledButton = styled.button`
  padding-left: 3pt;
  font-size: 13t;
  height: 19pt;
`

class Button extends React.Component {
  render () {
    return (
      <StyledButton {...this.props} />
    )
  }
}

export default Button

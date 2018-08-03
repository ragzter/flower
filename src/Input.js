
import React from 'react';
import styled from 'styled-components'

const StyledInput = styled.input`
  width: 133pt;
  padding-left: 3pt;
  margin-right: 10pt;
  font-size: 13t;
  height: 15pt;
`

class Input extends React.Component {
  render () {
    return (
      <StyledInput {...this.props} />
    )
  }
}

export default Input

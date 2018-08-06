
import React from 'react';
import styled from 'styled-components'

const StyledInput = styled.input`
  color: #404040;
  width: 135pt;
  padding-left: 3pt;
  margin-right: 10pt;
  font-size: 13t;
  height: 17pt;
  border: 1px solid lightgray;
`

class Input extends React.Component {
  render () {
    return (
      <StyledInput {...this.props} />
    )
  }
}

export default Input

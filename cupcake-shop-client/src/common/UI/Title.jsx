import React from 'react';
import styled from 'styled-components';

const StyledH1 = styled.h1`
  margin: 20px 10px 25px 10px;
  text-align: ${props => (props.center ? 'center' : 'left')};
`;

const Title = ({ center, children }) => (
  <StyledH1 center={center}>{children}</StyledH1>
);

export default Title;

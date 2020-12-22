import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';

const StyledContainer = styled(Container)`
  margin: 0;
  margin-top: ${props => (props.border ? '10px' : '0')};
  padding: ${props => (props.border ? '10px' : '0')};
  border: 0;
  max-width: 100%;
`;

const FullWidthContainer = ({ border, children }) => (
  <StyledContainer border={border}>{children}</StyledContainer>
);

export default FullWidthContainer;

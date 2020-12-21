import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  color: #ff0000;
  margin: 0 5px;
`;

const ErrorFeedback = ({ children }) => <StyledDiv>{children}</StyledDiv>;

export default ErrorFeedback;

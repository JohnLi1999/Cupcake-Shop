import React from 'react';
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';

const StyledAlert = styled(Alert)`
  margin-top: 50px;
  padding: 50px;
  border-radius: 10px;
  color: #0066ff;
  background-color: #ffcc99;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
`;

const Empty = ({ children }) => <StyledAlert>{children}</StyledAlert>

export default Empty;
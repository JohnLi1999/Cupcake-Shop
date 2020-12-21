import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  font-size: 18px;
  font-weight: 500;
  margin: 10px 2px;
`;

const FormLabel = ({ children }) => <StyledLabel>{children}</StyledLabel>;

export default FormLabel;

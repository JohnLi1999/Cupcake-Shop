import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

const CustomSpinner = () => (
  <Container className="d-flex justify-content-center">
    <Spinner animation="border" variant="primary" />
  </Container>
);

export default CustomSpinner;

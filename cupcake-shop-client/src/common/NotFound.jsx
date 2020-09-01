import React from 'react';
import styled from 'styled-components';
import { Container, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ErrorTitle = styled(Alert)`
  font-size: 15vw;
  text-algin: center;
`;

const ErrorContent = styled(Alert)`
  font-size: 25px;
  text-align: center;
`;

const NotFound = () => (
  <Container>
    <Alert variant='info' className='text-center m-5'>
      <ErrorTitle>Oops!</ErrorTitle>
      <ErrorContent>The page you are visiting is not found</ErrorContent>
      <Link to='/'>
        <Button>Go Back to Home Page</Button>
      </Link>
    </Alert>
  </Container>
);

export default NotFound;

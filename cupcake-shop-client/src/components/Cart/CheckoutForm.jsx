import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Button, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

import { MASTER, VISA, WECHAT, ALIPAY } from '../../constants/constants';

const StyledLabel = styled.label`
  font-size: 18px;
  font-weight: 500;
  margin: 10px 2px;
`;

const StyledErrorFeedback = styled.div`
  color: #ff0000;
  margin: 0 5px;
`;

const CheckoutForm = ({ totalPrice, totalAmount }) => (
  <Form>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <StyledLabel>Receiver</StyledLabel>
      <Field
        className="form-control"
        type="text"
        name="receiver"
        placeholder="Please enter the receiver name"
      />
      <StyledErrorFeedback>
        <ErrorMessage name="receiver" />
      </StyledErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <StyledLabel>Address</StyledLabel>
      <Field
        className="form-control"
        type="text"
        name="address"
        placeholder="Please enter the address"
      />
      <StyledErrorFeedback>
        <ErrorMessage name="address" />
      </StyledErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <StyledLabel>Total Price: {totalPrice}</StyledLabel>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <StyledLabel>Total Amount: {totalAmount}</StyledLabel>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <StyledLabel>Pay Type</StyledLabel>
      <Field as="select" name="payType" className="form-control">
        <option value="default">--- Select your Payment Type ---</option>
        <option value={MASTER}>MASTER</option>
        <option value={VISA}>VISA</option>
        <option value={WECHAT}>WECHAT</option>
        <option value={ALIPAY}>ALIPAY</option>
      </Field>
      <StyledErrorFeedback>
        <ErrorMessage name="payType" />
      </StyledErrorFeedback>
    </FormGroup>
    <Row className="justify-content-center">
      <Button className="m-3" size="lg" type="submit">
        Place the Order!
      </Button>
    </Row>
  </Form>
);

export default CheckoutForm;

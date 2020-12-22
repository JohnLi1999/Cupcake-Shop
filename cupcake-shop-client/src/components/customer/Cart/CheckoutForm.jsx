import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Button, Col, Row } from 'react-bootstrap';

import ErrorFeedback from '../../../common/UI/ErrorFeedback';
import FormLabel from '../../../common/UI/FormLabel';
import { MASTER, VISA, WECHAT, ALIPAY } from '../../../constants/constants';
import {
  RECEIVER_PLACEHOLDER,
  ADDRESS_PLACEHOLDER,
  DEFAULT_PAY_TYPE_PLACEHOLDER,
} from '../../../constants/en';

const CheckoutForm = ({ totalPrice, totalAmount }) => (
  <Form>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Receiver</FormLabel>
      <Field
        className="form-control"
        type="text"
        name="receiver"
        placeholder={RECEIVER_PLACEHOLDER}
      />
      <ErrorFeedback>
        <ErrorMessage name="receiver" />
      </ErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Address</FormLabel>
      <Field
        className="form-control"
        type="text"
        name="address"
        placeholder={ADDRESS_PLACEHOLDER}
      />
      <ErrorFeedback>
        <ErrorMessage name="address" />
      </ErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Total Price: {totalPrice}</FormLabel>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Total Amount: {totalAmount}</FormLabel>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Pay Type</FormLabel>
      <Field as="select" name="payType" className="form-control">
        <option value="default">{DEFAULT_PAY_TYPE_PLACEHOLDER}</option>
        <option value={MASTER}>{MASTER}</option>
        <option value={VISA}>{VISA}</option>
        <option value={WECHAT}>{WECHAT}</option>
        <option value={ALIPAY}>{ALIPAY}</option>
      </Field>
      <ErrorFeedback>
        <ErrorMessage name="payType" />
      </ErrorFeedback>
    </FormGroup>
    <Row className="justify-content-center">
      <Button className="m-3" size="lg" type="submit">
        Place the Order!
      </Button>
    </Row>
  </Form>
);

export default CheckoutForm;

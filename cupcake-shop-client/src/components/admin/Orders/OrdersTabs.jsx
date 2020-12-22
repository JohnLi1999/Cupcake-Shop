import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import OrdersTable from './OrdersTable';
import FullWidthContainer from '../../../common/UI/FullWidthContainer';

const OrdersTabs = ({ orders, keys, handleUpdate }) => (
  <FullWidthContainer needMargin="true">
    <Tabs defaultActiveKey="all">
      {keys.map(key => {
        if (typeof key === 'object') {
          return (
            <Tab eventKey={key.eventKey} title={key.title}>
              <OrdersTable orders={orders} handleUpdate={handleUpdate} />
            </Tab>
          );
        } else {
          return (
            <Tab eventKey={key} title={key}>
              <OrdersTable
                orders={orders}
                targetStatus={key}
                handleUpdate={handleUpdate}
              />
            </Tab>
          );
        }
      })}
    </Tabs>
  </FullWidthContainer>
);

export default OrdersTabs;

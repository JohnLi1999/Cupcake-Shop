import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import OrdersTable from './OrdersTable';
import FullWidthContainer from '../../../common/UI/FullWidthContainer';

const OrdersTabs = ({ orders, keys, handleUpdate }) => (
  <FullWidthContainer needBorder="yes">
    <Tabs defaultActiveKey="all">
      {keys.map(key => {
        if (typeof key === 'object') {
          return (
            <Tab key={key.eventKey} eventKey={key.eventKey} title={key.title}>
              <OrdersTable orders={orders} handleUpdate={handleUpdate} />
            </Tab>
          );
        } else {
          return (
            <Tab key={key} eventKey={key} title={key}>
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

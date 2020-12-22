import React from 'react';
import { Button, Row, Tabs, Tab } from 'react-bootstrap';

import FullWidthContainer from '../../../common/UI/FullWidthContainer';
import CakesTable from '../../../components/admin/Cakes/CakesTable';

const CakesTabs = ({ keys, cakes, addCake, updateCake }) => {
  return (
    <FullWidthContainer border="true">
      <Row className="justify-content-end">
        <Button className="mt-2 mr-4" variant="info" onClick={addCake}>
          Add a new Cake
        </Button>
      </Row>
      <Tabs defaultActiveKey="all">
        {keys.map(key => (
          <Tab key={key.eventKey} eventKey={key.eventKey} title={key.title}>
            <CakesTable
              cakes={cakes}
              targetTab={key.targetTab}
              updateCake={updateCake}
            />
          </Tab>
        ))}
      </Tabs>
    </FullWidthContainer>
  );
};

export default CakesTabs;

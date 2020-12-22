import React, { useEffect } from 'react';
import { Table, Button, Row, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FullWidthContainer from '../../../common/UI/FullWidthContainer';
import { TODAY_SPECIAL, BEST_SELLING } from '../../../constants/constants';

const AdminCakes = ({ loadCakes, cakes, history }) => {
  useEffect(() => {
    loadCakes();
  }, [loadCakes]);

  const getTargetCakeList = (cakeList, tag) =>
    tag ? cakeList.filter(cake => cake.tags.includes(tag)) : cakeList;

  const buildCakeList = targetTab => (
    <Table striped bordered hover responsive className="text-center mt-2">
      <thead className="thead-dark">
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th width="10%">IMAGES</th>
          <th>DESCRIPTION</th>
          <th>PRICE ($)</th>
          <th>STOCK</th>
          <th>CATEGORY</th>
          <th width="5%">CREATED AT</th>
          <th width="5%">UPDATED AT</th>
          <th>OPERATIONS</th>
        </tr>
      </thead>
      <tbody>
        {getTargetCakeList(cakes, targetTab).map(cake => (
          <tr key={cake.id}>
            <td>{cake.id}</td>
            <td>{cake.name}</td>
            <td className="d-flex">
              <img
                className="m-1"
                style={{ width: 50, height: 50 }}
                src={cake.cover}
                alt={cake.name}
              />
              <img
                className="m-1"
                style={{ width: 50, height: 50 }}
                src={cake.img1}
                alt={cake.name}
              />
              <img
                className="m-1"
                style={{ width: 50, height: 50 }}
                src={cake.img2}
                alt={cake.name}
              />
            </td>
            <td>{cake.description}</td>
            <td>{cake.price}</td>
            <td>{cake.stock}</td>
            <td>{cake.category}</td>
            <td>{cake.createdAt}</td>
            <td>{cake.updatedAt}</td>
            <td>
              <Button
                variant="warning"
                className="m-1"
                onClick={() =>
                  history.push(`/admin/cakes/update/${cake.id}`, {
                    update: true,
                    id: cake.id,
                  })
                }>
                Update
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <FullWidthContainer needBorder="yes">
      <Row className="justify-content-end">
        <Button
          className="mt-2 mr-4"
          variant="info"
          onClick={() => history.push('/admin/cakes/add', { add: true })}>
          Add a new Cake
        </Button>
      </Row>
      <Tabs defaultActiveKey="all">
        <Tab eventKey="all" title="All Cakes">
          {buildCakeList()}
        </Tab>
        <Tab eventKey="today_special" title="Today's Special">
          {buildCakeList(TODAY_SPECIAL)}
        </Tab>
        <Tab eventKey="best_selling" title="Best Selling">
          {buildCakeList(BEST_SELLING)}
        </Tab>
      </Tabs>
    </FullWidthContainer>
  );
};

const mapStateToProps = state => {
  const { cakes } = state.cake;

  return {
    cakes,
  };
};

export default connect(mapStateToProps)(withRouter(AdminCakes));

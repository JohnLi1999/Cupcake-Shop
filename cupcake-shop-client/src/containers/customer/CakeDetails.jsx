import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import CakeDetailsImages from '../../components/customer/Cake/CakeDetailsImages';
import CakeDetailsDescription from '../../components/customer/Cake/CakeDetailsDescription';
import { isAuthenticated } from '../../util/auth';
import { filterByCondition } from '../../util/utility';
import { addItemToTempCart } from '../../util/tempCart';

const CakeDetails = ({ cakes, history, match, addCakeToCart }) => {
  const [showCover, setShowCover] = useState(true);
  const [showImg1, setShowImg1] = useState(false);
  const [showImg2, setShowImg2] = useState(false);

  const displayCoverHandler = () => {
    setShowCover(true);
    setShowImg1(false);
    setShowImg2(false);
  };

  const displayImg1Handler = () => {
    setShowCover(false);
    setShowImg1(true);
    setShowImg2(false);
  };

  const displayImg2Handler = () => {
    setShowCover(false);
    setShowImg1(false);
    setShowImg2(true);
  };

  const addToCartHandler = cakeId => {
    if (isAuthenticated()) {
      return addCakeToCart(cakeId, `/cakes/${match.params.name}`);
    }
    addItemToTempCart(cakeId);
    toast.success('Cake added!');
    return history.push(`/cakes/${match.params.name}`);
  };

  return (
    <Container>
      {filterByCondition('object', cakes, 'name', match.params.name).map(
        cake => (
          <Row key={cake.id}>
            <CakeDetailsImages
              cake={cake}
              showCover={showCover}
              showImg1={showImg1}
              showImg2={showImg2}
              displayCover={displayCoverHandler}
              displayImg1={displayImg1Handler}
              displayImg2={displayImg2Handler}
            />
            <CakeDetailsDescription
              cake={cake}
              history={history}
              match={match}
              addToCart={addToCartHandler}
            />
          </Row>
        )
      )}
    </Container>
  );
};

const mapStateToProps = state => {
  const { cakes } = state.cake;

  return {
    cakes,
  };
};

export default connect(mapStateToProps)(withRouter(CakeDetails));

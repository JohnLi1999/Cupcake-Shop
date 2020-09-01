import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';

import { isAuthenticated } from '../../shared/utility';
import { addItemToTempCart } from '../../shared/tempCart';
import './CakeDetails.css';

const CakeDetails = ({ addCakeToCart, cakes, history, match }) => {
  const [showCover, setShowCover] = useState('block');
  const [showImg1, setShowImg1] = useState('none');
  const [showImg2, setShowImg2] = useState('none');

  const getTargetCake = (cakeList, name) =>
    cakeList.filter((cake) => cake.name === name);

  const buildCakeDetail = () =>
    getTargetCake(cakes, match.params.name).map((cake) => (
      <Row key={cake.id}>
        <Col sm={7} lg={5}>
          <Row className='p-1'>
            <div className='cake-detail-image-area'>
              <img
                className='cake-detail-slide'
                src={cake.cover}
                alt=''
                style={{ display: showCover }}
              />
              <img
                className='cake-detail-slide'
                src={cake.img1}
                alt=''
                style={{ display: showImg1 }}
              />
              <img
                className='cake-detail-slide'
                src={cake.img2}
                alt=''
                style={{ display: showImg2 }}
              />
            </div>
          </Row>
          <Row>
            <Col className='p-1'>
              <img
                className={
                  showCover === 'block'
                    ? 'img-fluid cake-detail-image cake-detail-image-active'
                    : 'img-fluid cake-detail-image'
                }
                src={cake.cover}
                alt='COVER'
                onClick={() => {
                  setShowCover('block');
                  setShowImg1('none');
                  setShowImg2('none');
                }}
              />
            </Col>
            <Col className='p-1'>
              <img
                className={
                  showImg1 === 'block'
                    ? 'img-fluid cake-detail-image cake-detail-image-active'
                    : 'img-fluid cake-detail-image'
                }
                src={cake.img1}
                alt='IMAGE1'
                onClick={() => {
                  setShowCover('none');
                  setShowImg1('block');
                  setShowImg2('none');
                }}
              />
            </Col>
            <Col className='p-1'>
              <img
                className={
                  showImg2 === 'block'
                    ? 'img-fluid cake-detail-image cake-detail-image-active'
                    : 'img-fluid cake-detail-image'
                }
                src={cake.img2}
                alt='IMAGE2'
                onClick={() => {
                  setShowCover('none');
                  setShowImg1('none');
                  setShowImg2('block');
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col sm={5} lg={7} className='text-center'>
          <div className='cake-detail-name'>{cake.name}</div>
          <div className='cake-detail-category'>
            Category: <span>{cake.category}</span>
          </div>
          <div className='cake-detail-description'>{cake.description}</div>
          <div className='cake-detail-price'>
            $ <span>{cake.price}</span>
          </div>
          <button
            className='cake-detail-button'
            onClick={() => {
              if (isAuthenticated()) {
                return addCakeToCart(cake.id, `/cakes/${match.params.name}`);
              }
              addItemToTempCart(cake.id);
              toast.success('Cake added!');
              return history.push(`/cakes/${match.params.name}`);
            }}>
            Add to Cart
          </button>
        </Col>
      </Row>
    ));

  return <Container>{buildCakeDetail()}</Container>;
};

const mapStateToProps = (state) => {
  const { cakes } = state.cake;

  return {
    cakes,
  };
};

export default connect(mapStateToProps)(withRouter(CakeDetails));

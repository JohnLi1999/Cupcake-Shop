import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

const CakeDetailImageAreaDiv = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const CakeDetailSlideImg = styled.img`
  width: 100%;
  height: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  display: ${props => (props.show ? 'block' : 'none')};
`;

const CakeDetailImg = styled.img`
  width: 100%;
  height: 100%;
  margin: 5px auto;
  border: 2px solid #d9d9d9;
  border-radius: 3px;
  cursor: pointer;
  opacity: ${props => (props.show ? 1 : 0.6)};

  &:hover {
    opacity: 1;
  }
`;

const CakeDetailsImages = ({
  cake,
  showCover,
  showImg1,
  showImg2,
  displayCover,
  displayImg1,
  displayImg2,
}) => (
  <Col sm={7} lg={5}>
    <Row className="p-1">
      <CakeDetailImageAreaDiv>
        <CakeDetailSlideImg src={cake.cover} alt="COVER" show={showCover} />
        <CakeDetailSlideImg src={cake.img1} alt="IMAGE1" show={showImg1} />
        <CakeDetailSlideImg src={cake.img2} alt="IMAGE2" show={showImg2} />
      </CakeDetailImageAreaDiv>
    </Row>
    <Row>
      <Col className="p-1">
        <CakeDetailImg
          src={cake.cover}
          alt="COVER"
          onClick={displayCover}
          show={showCover}
        />
      </Col>
      <Col className="p-1">
        <CakeDetailImg
          src={cake.img1}
          alt="IMAGE1"
          onClick={displayImg1}
          show={showImg1}
        />
      </Col>
      <Col className="p-1">
        <CakeDetailImg
          src={cake.img2}
          alt="IMAGE2"
          onClick={displayImg2}
          show={showImg2}
        />
      </Col>
    </Row>
  </Col>
);

export default CakeDetailsImages;

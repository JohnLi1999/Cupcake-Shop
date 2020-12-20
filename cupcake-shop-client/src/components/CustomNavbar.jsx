import React from 'react';
import styled from 'styled-components';
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

import brandingImage from '../assets/branding.png';
import {
  isAuthenticated,
  isAdmin,
} from '../util/auth';
import {getSubtotalAmount} from '../util/cart';
import { getTempCart } from '../util/tempCart';

const StyledNavbar = styled(Navbar)`
  background-color: #e6b3b3;
  padding: 0px;
  font-size: 18px;
  font-weight: 700;
  color: #993333;
`

const StyledNavbarBrand = styled(Navbar.Brand)`
  padding: 10px 20px;
  pointer-events: none;
  cursor: default;
`

const StyleNavbarToggler = styled(Navbar.Toggle)`
  margin: 5px 20px;
  background-color: #6699ff;
`

const StyledNav = styled(Nav)`
  padding: 14px 15px;
  font-size: 18px;
  font-weight: 700;
  color: #993333;
`

const NavLink = styled(Link)`
  padding: 17px 15px;
  font-size: 18px;
  font-weight: 700;
  color: #993333;

  &:hover {
    color: #ffcccc;
    background-color: #993333;
    text-decoration: none;
  }
`; 

const StyledNavDropdown = styled(NavDropdown)`
  a {
    color: #993333 !important;
  }

  .nav-link {
    display: inline;
    padding: 17px 15px;
  }
  .nav-link:hover {
    color: #ffcccc !important;
    background-color: #993333;
    text-decoration: none;
  }

  .dropdown-menu {
    border: none;
    padding: 0px;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
`

const StyledNavDropdownItem = styled(NavDropdown.Item)`
  border-bottom: 1px solid #e6e6e6;
  font-size: 16px;
  font-weight: 700;
  color: #862d2d;
  background-color: #ffad33;
  padding: 16px 16px;
  text-decoration: none;
  display: block;
  text-align: left;

  &:hover {
    color: #ffffff !important;
    background-color: #ff80ff;
  }
`

const CustomNavbar = ({ categories, cart, onLogOut, history }) => {
  return (
    <StyledNavbar collapseOnSelect expand='sm' sticky='top'>
      <StyledNavbarBrand>
        <img src={brandingImage} alt='Cupcake Shop' />
      </StyledNavbarBrand>
      <StyleNavbarToggler aria-controls='responsive-navbar-nav' className='mr-2' />
      <Navbar.Collapse>
        <StyledNav className='mr-auto'>
          <Nav.Item>
            <NavLink to='/'>
              Home
            </NavLink>
          </Nav.Item>
          <StyledNavDropdown title='Categories'>
            {categories.map((category) => (
              <StyledNavDropdownItem
                key={category.name}
                onClick={() =>
                  history.push(`/category/${category.name}`, {
                    name: category.name,
                  })
                }>
                {category.name}
              </StyledNavDropdownItem>
            ))}
          </StyledNavDropdown>
          {isAdmin() && (
            <StyledNavDropdown title='Admin Center'>
              <StyledNavDropdownItem onClick={() => history.push('/admin/users')}>
                Users
              </StyledNavDropdownItem>
              <StyledNavDropdownItem
                onClick={() => history.push('/admin/categories')}>
                Categories
              </StyledNavDropdownItem>
              <StyledNavDropdownItem onClick={() => history.push('/admin/cakes')}>
                Cakes
              </StyledNavDropdownItem>
              <StyledNavDropdownItem onClick={() => history.push('/admin/orders')}>
                Orders
              </StyledNavDropdownItem>
            </StyledNavDropdown>
          )}
        </StyledNav>
        <StyledNav className='ml-auto'>
          <Nav.Item>
            <NavLink to='/cart'>
              <FontAwesomeIcon icon={faCartArrowDown} />
              {isAuthenticated()
                ? cart.length > 0 &&
                  getSubtotalAmount(cart) !== 0 && (
                    <Badge variant='info' className='mx-2'>
                      {getSubtotalAmount(cart)}
                    </Badge>
                  )
                : getTempCart() !== null &&
                  getSubtotalAmount(getTempCart()) !== 0 && (
                    <Badge variant='info' className='mx-2'>
                      {getSubtotalAmount(getTempCart())}
                    </Badge>
                  )}
            </NavLink>
          </Nav.Item>
          {!isAuthenticated() && (
            <>
              <Nav.Item>
                <NavLink to='/login'>
                  Log In
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to='/signup'>
                  Sign Up
                </NavLink>
              </Nav.Item>
            </>
          )}
          {isAuthenticated() && (
            <>
              <Nav.Item>
                <NavLink to='/orders'>
                  Order List
                </NavLink>
              </Nav.Item>
              <StyledNavDropdown title='Profile'>
                <StyledNavDropdownItem
                  onClick={() => {
                    history.push('/profile');
                  }}>
                  Profile
                </StyledNavDropdownItem>
                <StyledNavDropdownItem
                  onClick={() => {
                    onLogOut();
                  }}>
                  Log Out
                </StyledNavDropdownItem>
              </StyledNavDropdown>
            </>
          )}
        </StyledNav>
      </Navbar.Collapse>
    </StyledNavbar>
  );
};

const mapStateToProps = (state) => {
  const { categories } = state.category;
  const { cart } = state;

  return {
    categories,
    cart,
  };
};

export default connect(mapStateToProps)(withRouter(CustomNavbar));

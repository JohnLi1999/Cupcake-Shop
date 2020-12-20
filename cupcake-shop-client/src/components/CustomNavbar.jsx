import React from 'react';	
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';	
import { Link, withRouter } from 'react-router-dom';	
import { connect } from 'react-redux';	
import 'bootstrap/dist/css/bootstrap.css';	
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';	
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';	

import brandingImage from '../assets/branding.png';	
import '../styles/CustomNavbar.css';	
import {	
  isAuthenticated,	
  isAdmin
} from '../util/auth';	
import { getSubtotalAmount } from '../util/cart'
import { getTempCart } from '../util/tempCart';	

const CustomNavbar = ({ categories, cart, onLogOut, history }) => {	
  return (	
    <Navbar collapseOnSelect expand='sm' sticky='top'>	
      <Navbar.Brand>	
        <img src={brandingImage} alt='Cupcake Shop' />	
      </Navbar.Brand>	
      <Navbar.Toggle aria-controls='responsive-navbar-nav' className='mr-2' />	
      <Navbar.Collapse>	
        <Nav className='mr-auto'>	
          <Nav.Item>	
            <Link to='/' className='nav-link'>	
              Home	
            </Link>	
          </Nav.Item>	
          <NavDropdown title='Categories'>	
            {categories.map((category) => (	
              <NavDropdown.Item	
                key={category.name}	
                onClick={() =>	
                  history.push(`/category/${category.name}`, {	
                    name: category.name,	
                  })	
                }>	
                {category.name}	
              </NavDropdown.Item>	
            ))}	
          </NavDropdown>	
          {isAdmin() && (	
            <NavDropdown title='Admin Center'>	
              <NavDropdown.Item onClick={() => history.push('/admin/users')}>	
                Users	
              </NavDropdown.Item>	
              <NavDropdown.Item	
                onClick={() => history.push('/admin/categories')}>	
                Categories	
              </NavDropdown.Item>	
              <NavDropdown.Item onClick={() => history.push('/admin/cakes')}>	
                Cakes	
              </NavDropdown.Item>	
              <NavDropdown.Item onClick={() => history.push('/admin/orders')}>	
                Orders	
              </NavDropdown.Item>	
            </NavDropdown>	
          )}	
        </Nav>	
        <Nav className='ml-auto'>	
          <Nav.Item>	
            <Link to='/cart' className='nav-link'>	
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
            </Link>	
          </Nav.Item>	
          {!isAuthenticated() && (	
            <>	
              <Nav.Item>	
                <Link to='/login' className='nav-link'>	
                  Log In	
                </Link>	
              </Nav.Item>	
              <Nav.Item>	
                <Link to='/signup' className='nav-link'>	
                  Sign Up	
                </Link>	
              </Nav.Item>	
            </>	
          )}	
          {isAuthenticated() && (	
            <>	
              <Nav.Item>	
                <Link to='/orders' className='nav-link'>	
                  Order List	
                </Link>	
              </Nav.Item>	
              <NavDropdown title='Profile'>	
                <NavDropdown.Item	
                  onClick={() => {	
                    history.push('/profile');	
                  }}>	
                  Profile	
                </NavDropdown.Item>	
                <NavDropdown.Item	
                  onClick={() => {	
                    onLogOut();	
                  }}>	
                  Log Out	
                </NavDropdown.Item>	
              </NavDropdown>	
            </>	
          )}	
        </Nav>	
      </Navbar.Collapse>	
    </Navbar>	
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
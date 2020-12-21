import React from 'react';
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

import NavItem from './NavItem';
import NavDropDownItem from './NavDropdownItem';
import brandingImage from '../../assets/branding.png';
import '../../styles/CustomNavbar.css';

const CustomNavbar = ({
  categories,
  isAuthenticated,
  isAdmin,
  cartAmount,
  tempCartAmount,
  useCart,
  useTempCart,
  onLogOut,
  history,
}) => {
  return (
    <Navbar collapseOnSelect expand="sm" sticky="top">
      <Navbar.Brand>
        <img src={brandingImage} alt="Cupcake Shop" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className="mr-2" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <NavItem path="/" content="Home" />
          <NavDropdown title="Categories">
            {categories.map(category => (
              <NavDropDownItem
                key={category.name}
                path={`/category/${category.name}`}
                param={category.name}
                content={category.name}
                history={history}
              />
            ))}
          </NavDropdown>
          {isAdmin && (
            <NavDropdown title="Admin Center">
              <NavDropDownItem
                path="/admin/users"
                content="Users"
                history={history}
              />
              <NavDropDownItem
                path="/admin/categories"
                content="Categories"
                history={history}
              />
              <NavDropDownItem
                path="/admin/cakes"
                content="Cakes"
                history={history}
              />
              <NavDropDownItem
                path="/admin/orders"
                content="Orders"
                history={history}
              />
            </NavDropdown>
          )}
        </Nav>

        <Nav className="ml-auto">
          <Nav.Item>
            <Link to="/cart" className="nav-link">
              <FontAwesomeIcon icon={faCartArrowDown} />
              {isAuthenticated
                ? useCart && (
                    <Badge variant="info" className="mx-2">
                      {cartAmount}
                    </Badge>
                  )
                : useTempCart && (
                    <Badge variant="info" className="mx-2">
                      {tempCartAmount}
                    </Badge>
                  )}
            </Link>
          </Nav.Item>
          {!isAuthenticated && (
            <>
              <NavItem path="/login" content="Log In" />
              <NavItem path="/signup" content="Sign Up" />
            </>
          )}
          {isAuthenticated && (
            <>
              <NavItem path="/orders" content="Order List" />
              <NavDropdown title="Profile">
                <NavDropDownItem
                  path="/profile"
                  content="Profile"
                  history={history}
                />
                <NavDropDownItem content="Log Out" func={onLogOut} />
              </NavDropdown>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;

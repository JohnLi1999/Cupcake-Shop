import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavItem = ({ path, content }) => (
  <Nav.Item>
    <Link to={path} className="nav-link">
      {content}
    </Link>
  </Nav.Item>
);

export default NavItem;

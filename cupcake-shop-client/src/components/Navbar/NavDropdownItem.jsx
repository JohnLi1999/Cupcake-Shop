import React from 'react';
import { NavDropdown } from 'react-bootstrap';	

const NavDropdownItem = ({ path, param, content, history, func }) =>
  <NavDropdown.Item 
    onClick={
      () => !path ? 
              func():
              !!param ? 
                history.push(path, {name: param}) : 
                history.push(path)
    }>	
    {content}
  </NavDropdown.Item>	

export default NavDropdownItem;
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const PublicNavigationLinksComp = () => (
  <Nav className="ml-auto" navbar>
    <NavLink to="/auth/login">Login</NavLink>
    <NavLink to="/auth/signup">signup</NavLink>
  </Nav>
);

export default PublicNavigationLinksComp;

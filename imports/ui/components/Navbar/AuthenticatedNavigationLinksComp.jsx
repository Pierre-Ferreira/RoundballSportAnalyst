import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';
import './AuthenticatedNavigationLinksComp.less';

import {
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';

export default class AuthenticatedNavigationLinksComp extends Component {
  constructor(props) {
    super(props);
    this.logoutFN = this.logoutFN.bind(this);
  }

  logoutFN() {
    Meteor.logout((err) => {
      if (err) {
        console.log( err.reason );
      } else {
        this.props.toHomepage();
      }
    });
  }

  render() {
    let authMenuItems = '';
    if (this.props.userIsSuperAdmin) {
      authMenuItems = (
        <div id="superuser-menu-items">
          <NavDropdown eventKey={3} title="Admin" id="basic-nav-dropdown">
            <MenuItem eventKey="1">
              <NavLink to="/admin/blockchain_api">Blockchain API</NavLink>
            </MenuItem>
            <MenuItem eventKey="2">
              <NavLink to="/admin/import_existing">Import</NavLink>
            </MenuItem>
          </NavDropdown>
          <NavLink to="/auth/login" onClick={this.logoutFN}>Logout</NavLink>
        </div>
      );
    } else {
      authMenuItems = (
        <div id="clients-menu-items">
          <NavDropdown eventKey={3} title={this.props.username} id="basic-nav-dropdown">
            <MenuItem eventKey="1">
              <NavLink to="/myteam">My Team</NavLink>
            </MenuItem>
            <MenuItem eventKey="2">
              <NavLink to="/settings">Settings</NavLink>
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="3">
              <NavLink to="/auth/login" onClick={this.logoutFN}>Logout</NavLink>
            </MenuItem>

            {/* <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3">Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Separated link</MenuItem> */}
          </NavDropdown>
        </div>
      );
    }
    return authMenuItems;
  }
}

AuthenticatedNavigationLinksComp.propTypes = {
  userIsSuperAdmin: PropTypes.bool.isRequired,
  toHomepage: PropTypes.func.isRequired,
};

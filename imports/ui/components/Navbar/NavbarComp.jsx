import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import AuthenticatedNavigationLinksContainer from '../../containers/Navbar/AuthenticatedNavigationLinksContainer';
import PublicNavigationLinksContainer from '../../containers/Navbar/PublicNavigationLinksContainer';
import './NavbarComp.less';

export default class NavbarComp extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const renderNavigationLinks = authenticated =>
      (authenticated ?
        <AuthenticatedNavigationLinksContainer /> :
        <PublicNavigationLinksContainer />
      );
    return (
      <div>
        <Navbar inverse fluid id="navbar-comp">
          <Navbar.Header>
            <Navbar.Brand>
              Crypto Learning Club
            </Navbar.Brand>
          <Navbar.Toggle />
          </Navbar.Header>
          {/* <Navbar.Collapse> */}
            { renderNavigationLinks(this.props.authenticated) }
          {/* </Navbar.Collapse> */}
        </Navbar>
      </div>
    );
  }
}

NavbarComp.propTypes = {
  authenticated: PropTypes.bool,
};

NavbarComp.defaultProps = {
  authenticated: false,
};

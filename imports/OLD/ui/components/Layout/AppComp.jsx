import React from 'react';
import { Meteor } from 'meteor/meteor';
import NavBarContainer from '../../containers/Navbar/NavbarContainer';
import MainContainer from '../../containers/Layout/MainContainer';

const AppComp = () => (
  <div>
    <NavBarContainer />
    <MainContainer />
  </div>
);

export default AppComp;

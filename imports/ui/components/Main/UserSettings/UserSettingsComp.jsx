import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PersonalInfoContainer from '../../../containers/Main/UserSettings/PersonalInfoContainer';
import EmailInfoContainer from '../../../containers/Main/UserSettings/EmailInfoContainer';
import WalletInfoContainer from '../../../containers/Main/UserSettings/WalletInfoContainer';
import PasswordResetComp from './PasswordResetComp';
import './UserSettingsComp.less';

const UserSettingsComp = (props) => {
  return (
    <div id="user-settings-comp">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-8 user-settings-area">
            <div className="col-md-6 offset-md-3">
              <h1>Settings</h1>
            </div>

            <div className="col-md-8 offset-md-2">
              <hr />
              <PersonalInfoContainer />
              <hr />
            </div>

            <div className="col-md-8 offset-md-2">
              <EmailInfoContainer />
              <hr />
            </div>

            <div className="col-md-8 offset-md-2">
              <WalletInfoContainer />
              <hr />
            </div>

            <div className="col-md-8 offset-md-2">
              <PasswordResetComp />
              <hr />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsComp

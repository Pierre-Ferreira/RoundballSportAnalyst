import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// containers
import AppContainer from '../../ui/containers/AppContainer'
import MainContainer from '../../ui/containers/MainContainer'

// components
import SignupPage from '../../ui/components/SignupPage';
import LoginPage from '../../ui/components/LoginPage';
import ResetPassword from '../../ui/components/ResetPassword';
import ForgotPassword from '../../ui/components/ForgotPassword';

export const renderRoutes = () => (
  <Router>
    <div>
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/forgot_password" component={ForgotPassword} />
      <Route path="/reset-password/:token" component={ResetPassword} />
      <Route exact path="/" component={AppContainer} />
    </div>
  </Router>
);

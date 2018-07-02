import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthenticatedRouteComp = ({
  component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      const loggingIn = Meteor.loggingIn();
      const authenticated = !loggingIn && !!Meteor.userId();
      return authenticated ?
      (React.createElement(component, { ...props, loggingIn, authenticated })) :
      (<Redirect to="/" />);
    }}
  />
);

AuthenticatedRouteComp.propTypes = {
  component: PropTypes.func.isRequired,
};

export default AuthenticatedRouteComp;

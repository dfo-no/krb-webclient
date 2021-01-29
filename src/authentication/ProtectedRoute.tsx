import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { fakeAuth } from './AuthenticationHandler';

export const ProtectedRoute: React.ComponentType<any> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        fakeAuth.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

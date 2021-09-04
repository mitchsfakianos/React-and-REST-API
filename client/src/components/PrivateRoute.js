/*import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signIn",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;*/
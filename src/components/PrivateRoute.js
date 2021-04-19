import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../utils/hooks/useAuth';

const PrivateRoute = ({children, ...rest}) => {
  const userInfo = useAuth();
  const [auth, setAuth] = useState({});

  useEffect(() => {
    setAuth(userInfo);
  }, [userInfo])

  if (!auth.currentUser) {
    return <div>Loading</div>
  }

  return (
    <Route {...rest} 
      render = {() =>
        auth.currentUser && Object.keys(auth.currentUser).length ? (
          children
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  )
};

export default PrivateRoute;
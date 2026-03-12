import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>; // Or a proper spinner
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
/*
  The 'allowedRoles' variable was likely defined in a previous version of this file but was not used anywhere in the component.
  Unused variables cause a lint warning: "'allowedRoles' is defined but never used."
  To keep the code clean and avoid warnings, it was removed.
*/

export default PrivateRoute
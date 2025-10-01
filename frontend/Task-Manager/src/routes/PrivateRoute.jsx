import React from 'react'
import { Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  return <Outlet />;
}
/*
  The 'allowedRoles' variable was likely defined in a previous version of this file but was not used anywhere in the component.
  Unused variables cause a lint warning: "'allowedRoles' is defined but never used."
  To keep the code clean and avoid warnings, it was removed.
*/

export default PrivateRoute
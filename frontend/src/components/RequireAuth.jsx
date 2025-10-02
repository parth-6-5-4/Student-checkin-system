import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export function RequireAuth({ admin, children }) {
  const location = useLocation();

  if (!admin) {
    // redirect to login but remember where user wanted to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

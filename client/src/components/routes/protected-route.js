import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { getIsAuthenticated } from "features/auth/loginSlice";

const ProtectedRoute = (props) => {
  const isAuth = useSelector(getIsAuthenticated);
  if (!isAuth) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;

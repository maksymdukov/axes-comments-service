import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthenticated, login } from "features/auth/loginSlice";
import { parseHash } from "utils/uri";
import { history } from "index";

const Login = () => {
  const isAuth = useSelector(getIsAuthenticated);
  const dispatch = useDispatch();
  if (isAuth) {
    return <Redirect to="/" />;
  }
  useEffect(() => {
    console.log(window.location.hash);
    if (window.location.hash) {
      const hash = parseHash(window.location.hash);
      history.replace(window.location.pathname);
      if (hash.token) {
        dispatch(login(hash.token));
      }
    }
  }, []);
  return (
    <div>
      <a href="http://localhost:3001/api/admin/auth/google-start">Login</a>
    </div>
  );
};

export default Login;

import React from "react";
import { GoogleLogin } from "react-google-login";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthenticated, login } from "features/auth/loginSlice";

const Login = () => {
  const isAuth = useSelector(getIsAuthenticated);
  // const dispatch = useDispatch();
  if (isAuth) {
    return <Redirect to="/" />;
  }
  // const onSuccessHandler = ({ code }) => {
  //   // send
  //   dispatch(login(code));
  // };
  return (
    <div>
      <a href="http://localhost:3001/api/admin/auth/google-start">Login</a>
    </div>
  );
};

export default Login;

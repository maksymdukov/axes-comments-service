import React from "react";
import { GoogleLogin } from "react-google-login";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthenticated, login } from "features/auth/loginSlice";

const Login = () => {
  const isAuth = useSelector(getIsAuthenticated);
  const dispatch = useDispatch();
  if (isAuth) {
    return <Redirect to="/" />;
  }
  const onSuccessHandler = ({ code }) => {
    // send
    dispatch(login(code));
  };
  return (
    <div>
      <GoogleLogin
        clientId="381459483753-fm9uelj6lrs15qp2tv90fijgbjj28tds.apps.googleusercontent.com"
        buttonText="Login"
        responseType="code"
        onSuccess={onSuccessHandler}
        onFailure={(err) => {
          console.log(err);
        }}
      ></GoogleLogin>
    </div>
  );
};

export default Login;

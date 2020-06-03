import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { doLogout } from "features/auth/loginSlice";

const LogoutButton = ({ className }) => {
  const dispatch = useDispatch();
  const onLogoutClick = () => {
    dispatch(doLogout());
  };
  return (
    <Button variant="contained" className={className} onClick={onLogoutClick}>
      Выйти
    </Button>
  );
};

export default LogoutButton;

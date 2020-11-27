import { Alert } from "@material-ui/lab";
import React from "react";

const AlertError = ({ error }) => {
  if (!error) return null;
  return (
    <Alert severity="error" variant="filled">
      {Array.isArray(error)
        ? error.map((err) => <div key={err}>{err}</div>)
        : { error }}
    </Alert>
  );
};

export default AlertError;

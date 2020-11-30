import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

const ChangeStatus = ({ options, onOptionClick, children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItem = ({ value }) => () => {
    handleClose();
    onOptionClick(value);
  };
  return (
    <>
      {children({ handleClick })}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((opt) => (
          <MenuItem key={opt.label} onClick={handleMenuItem(opt)}>
            {opt.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ChangeStatus;

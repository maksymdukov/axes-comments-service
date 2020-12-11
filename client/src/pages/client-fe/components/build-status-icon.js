import React from "react";
import { BUILD_STATUS_MAP } from "../client-fe.constants";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";
import ErrorIcon from "@material-ui/icons/Error";
import BuildingIcon from "@material-ui/icons/Autorenew";
import { Avatar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ palette }) => ({
  ready: {
    backgroundColor: palette.success.main,
  },
  building: {
    backgroundColor: palette.warning.main,
  },
  error: {
    backgroundColor: palette.error.main,
  },
  canceled: {
    backgroundColor: palette.error.light,
  },
  buildingIcon: {
    animation: "$rotate 2s linear infinite",
  },
  "@keyframes rotate": {
    from: {
      transform: "rotate(0)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
}));

const buildIcons = {
  [BUILD_STATUS_MAP.ready]: {
    Icon: DoneIcon,
    className: "ready",
    hint: "Готов",
  },
  [BUILD_STATUS_MAP.building]: {
    Icon: BuildingIcon,
    iconClassname: "buildingIcon",
    className: "building",
    hint: "В процессе",
  },
  [BUILD_STATUS_MAP.queued]: {
    Icon: BuildingIcon,
    iconClassname: "buildingIcon",
    className: "building",
    hint: "В процессе",
  },
  [BUILD_STATUS_MAP.canceled]: {
    Icon: CancelIcon,
    className: "canceled",
    hint: "Отменен",
  },
  [BUILD_STATUS_MAP.error]: {
    Icon: ErrorIcon,
    className: "error",
    hint: "Ошибка",
  },
};

export const BuildStatusIcon = ({ status }) => {
  const classes = useStyles();
  let icon;
  let avatarClassName;
  let avatarHint;
  const iconObj = buildIcons[status];
  if (iconObj) {
    const { Icon, className, hint, iconClassname } = iconObj;
    avatarClassName = className;
    avatarHint = hint;
    icon = <Icon className={classes[iconClassname]} />;
  }
  return (
    <Avatar className={classes[avatarClassName]} title={avatarHint}>
      {icon}
    </Avatar>
  );
};

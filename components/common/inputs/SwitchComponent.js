/* eslint-disable no-unused-expressions */
import React, { useState } from "react";

import { withStyles } from "@material-ui/core/styles";
import { Switch } from "@material-ui/core";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 30,
    height: 18,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: "#fff",
    top: "-1px",
    boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.2)",
    "&$checked": {
      transform: "translateX(13px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: "#ff0050",
      },
    },
  },
  thumb: {
    width: 15.5,
    height: 15,
    boxShadow: "none",
  },
  track: {
    border: "solid 1px #cfcfcf",
    borderRadius: 18 / 2,
    opacity: 1,
    backgroundColor: "#eeeeee",
  },
  checked: {},
}))(Switch);

const SwitchComponent = ({
  label,
  register,
  name,
  className = "",
  controlled,
  handleChange,
  value,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={`c-switch ${className}`}>
      <span className="c-switch__label">{label}</span>
      <AntSwitch
        className="c-switch__switch"
        checked={controlled ? value : isChecked}
        onChange={() => {
          controlled ? handleChange(!value) : setIsChecked(!isChecked);
        }}
        name={name}
        inputRef={register}
      />
    </div>
  );
};

export default SwitchComponent;

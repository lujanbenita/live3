import { Menu } from "@material-ui/core";
import { useState } from "react";

const TranslateButton = ({ options, id, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        {...props}
        aria-label="more"
        aria-controls={`long-menu-${id}`}
        aria-haspopup="true"
        aria-hidden="true"
        type="button"
        className="c-translate-button"
        onClick={handleClick}
      ></button>
      <Menu
        disableScrollLock
        id={`long-menu-${id}`}
        anchorEl={anchorEl}
        classes={{
          list: "c-option-button__menu",
        }}
        keepMounted
        open={open}
        onClose={handleClose}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {options &&
          options.map(({ label, icon = "", action, disabled = false }) => (
            <div
              key={label}
              onClick={() => {
                if (!disabled) {
                  handleClose();
                  action();
                }
              }}
              role="button"
              aria-hidden="true"
              className={`c-option-button__option ${
                icon && `c-option-button__option--${icon}`
              }
              ${disabled ? `c-option-button__option--disabled` : ""}
              `}
            >
              {label}
            </div>
          ))}
      </Menu>
    </>
  );
};

export default TranslateButton;

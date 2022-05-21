import styled from "@emotion/styled";
import { Menu } from "@material-ui/core";
import { useState } from "react";

import MoreHorizStyled from "icons/MoreHorizStyled";
import NLATooltip from "../../tooltip/NLATooltip";

const StyledButton = styled.button`
  display: flex;
  align-items: center;

  ${(props) =>
    props.color &&
    `& > svg { fill:${props.color};
  }`}
  ${({ disabled }) =>
    disabled &&
    `& > svg {
    fill: #162a3a;
  }`}
`;

const OptionsButton = ({ options, id, ...props }) => {
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
      <StyledButton
        {...props}
        aria-label="more"
        aria-controls={`long-menu-${id}`}
        aria-haspopup="true"
        aria-hidden="true"
        type="button"
        className="c-options-button"
        onClick={handleClick}
      >
        <MoreHorizStyled />
      </StyledButton>

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
          options.map(
            ({
              label,
              icon = "",
              action,
              disabled = false,
              showTooltip = false,
            }) => (
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
                {showTooltip && <NLATooltip content={() => label} />}
                {!showTooltip && label}
              </div>
            )
          )}
      </Menu>
    </>
  );
};

export default OptionsButton;

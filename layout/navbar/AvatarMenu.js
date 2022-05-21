import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, MenuItem } from "@material-ui/core";
import { useRouter } from "next/router";

import LetterAvatar from "components/common/avatar/LetterAvatar";
import { logout } from "redux/user/userActions";

const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const name = useSelector((state) => state.user.firstName);
  const liveAccess = useSelector((state) => state.user.liveAccess);

  return (
    <>
      <LetterAvatar
        width={45}
        className="c-avatar__avatar"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="red"
      >
        {(name && name[0]) || "A"}
      </LetterAvatar>

      <Menu
        disableScrollLock
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="c-avatar__menu"
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        classes={
          {
            // root: "c-avatar__menu",
          }
        }
      >
        <MenuItem
          onClick={() => router.push("/my-account/my-settings")}
          className="c-avatar__my-account-item"
        >
          My account
        </MenuItem>
        {liveAccess && liveAccess.includes("live2") && (
          <MenuItem className="c-avatar__alva-2">
            <a className="c-avatar__alva-2-link" href="/content">
              Switch to alva 2
            </a>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => dispatch(logout())}
          className="c-avatar__logout-item"
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AvatarMenu;

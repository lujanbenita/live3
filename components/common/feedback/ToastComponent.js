import React from "react";
import Image from "next/image";

import { toast } from "react-toastify";

const switchIcon = (type) => {
  switch (type) {
    case "success":
      return (
        <Image
          className="c-toast__success"
          alt="alva Live"
          width="24"
          height="24"
          src={`${process.env.PUBLIC_URL}/img/icons/success.svg`}
        />
      );
    case "info":
      return (
        <Image
          className="c-toast__logo"
          alt="alva Live"
          width="24"
          height="24"
          src={`${process.env.PUBLIC_URL}/img/alva-iso-green.svg`}
        />
      );

    case "error": {
      return (
        <Image
          className="c-toast__logo"
          alt="alva Live"
          width="24"
          height="24"
          src={`${process.env.PUBLIC_URL}/img/alva-iso-red.svg`}
        />
      );
    }
    default:
      break;
  }
};

const ToastMessage = ({
  type,
  message,
  action,
  actionMessage = "First Action",
  autoClose,
  toastId,
}) => {
  if (toast.isActive(toastId)) return;

  toast[type](
    <div className="c-toast">
      <div className="c-toast__info">
        {switchIcon(type)}
        <div className="c-toast__message">{message}</div>
      </div>
      {action && (
        <button type="button" className="c-toast__action" onClick={action}>
          {actionMessage}
        </button>
      )}
    </div>,
    {
      autoClose,
      toastId,
    }
  );
};

export default ToastMessage;

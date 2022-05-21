import { showErrorNotification } from "utils/feedbackBubbles";

export const validateNewPassword = (data) => {
  const { newPassword, confirmNewPassword } = data;

  if (newPassword === "") {
    showErrorNotification("New password is required");
    return false;
  }

  if (confirmNewPassword === "") {
    showErrorNotification("Repeat new password is required");
    return false;
  }

  if (newPassword !== "" && confirmNewPassword !== "") {
    if (newPassword.length < 8) {
      showErrorNotification("New password must contain at least 8 characters");
      return false;
    }

    let re = /[a-z]/;
    if (!re.test(newPassword)) {
      showErrorNotification(
        "New password must contain at least one lowercase letter (a-z)"
      );
      return false;
    }

    re = /[A-Z]/;
    if (!re.test(newPassword)) {
      showErrorNotification(
        "New password must contain at least one uppercase letter (A-Z)"
      );
      return false;
    }

    re = /[0-9]/;
    if (!re.test(newPassword)) {
      showErrorNotification(
        "New password must contain at least one number (0-9)"
      );
      return false;
    }

    re = /[$@$!%*#?&]/;
    if (!re.test(newPassword)) {
      showErrorNotification(
        "New password must contain at least one special character ($,@,$,!,%,*,#,?,&)"
      );
      return false;
    }
  }

  if (
    newPassword !== "" &&
    confirmNewPassword !== "" &&
    newPassword !== confirmNewPassword
  ) {
    showErrorNotification("New password fields do not match");
    return false;
  }

  return true;
};

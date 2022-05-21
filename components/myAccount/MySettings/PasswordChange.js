import * as yup from "yup";
import { InputAdornment } from "@material-ui/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "components/common/buttons/Button";
import ControlledInput from "components/common/inputs/ControlledInput";
import { LockIcon } from "icons/IconsLibrary";

export const CURRENT_PASSWORD = "CURRENT_PASSWORD";
export const NEW_PASSWORD = "NEW_PASSWORD";
const REPEAT_NEW_PASSWORD = "REPEAT_NEW_PASSWORD";

const oldPasswordValidation = (fieldName) =>
  yup.string().required(`${fieldName} password is required`);

const genPasswordValidation = (fieldName) =>
  yup
    .string()
    .required(`${fieldName} password required`)
    .min(8, "must be at least 8 characters")
    .matches(/(.*[A-Z].*)/, "must contain one uppercase")
    .matches(/(.*[a-z].*)/, "must contain one lowercase")
    .matches(/(.*\d.*)/, "must contain one number")
    .matches(/(.*\W.*)/, "must contain one special case character");

const schema = yup.object().shape({
  [CURRENT_PASSWORD]: oldPasswordValidation("current"),
  [NEW_PASSWORD]: genPasswordValidation("new"),
  [REPEAT_NEW_PASSWORD]: yup
    .string()
    .oneOf([yup.ref(NEW_PASSWORD), null], "passwords must match")
    .required("confirm password is required"),
});

const PasswordChange = ({ onSubmit }) => {
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      [CURRENT_PASSWORD]: "",
      [NEW_PASSWORD]: "",
      [REPEAT_NEW_PASSWORD]: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        [CURRENT_PASSWORD]: "",
        [NEW_PASSWORD]: "",
        [REPEAT_NEW_PASSWORD]: "",
      });
    }
  }, [formState, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="c-my-settings__title">Password Change</h2>
      {/* faltan los regex */}
      <ControlledInput
        className="c-input c-text-field--blue c-text-field--no-padding c-user-badge__input"
        control={control}
        label="Current Password"
        name={CURRENT_PASSWORD}
        rules={{ required: true }}
        type="password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <LockIcon />
            </InputAdornment>
          ),
        }}
        error={formState.errors[CURRENT_PASSWORD]}
        helperText={formState.errors[CURRENT_PASSWORD]?.message}
      />
      <ControlledInput
        className="c-input c-text-field--blue c-text-field--no-padding c-user-badge__input"
        control={control}
        label="New Password"
        name={NEW_PASSWORD}
        rules={{ required: true }}
        type="password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <LockIcon />
            </InputAdornment>
          ),
        }}
        error={formState.errors[NEW_PASSWORD]}
        helperText={formState.errors[NEW_PASSWORD]?.message}
      />
      <ControlledInput
        className="c-input c-text-field--blue c-text-field--no-padding c-user-badge__input"
        control={control}
        label="Repeat New Password"
        name={REPEAT_NEW_PASSWORD}
        rules={{ required: true }}
        type="password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <LockIcon />
            </InputAdornment>
          ),
        }}
        error={formState.errors[REPEAT_NEW_PASSWORD]}
        helperText={formState.errors[REPEAT_NEW_PASSWORD]?.message}
      />
      <Button
        icon="password"
        type="submit"
        className="c-password-change__button"
      >
        Change Password
      </Button>
    </form>
  );
};

export default PasswordChange;

/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { InputAdornment } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import ControlledInput from "components/common/inputs/ControlledInput";
import SubmitButtonComponent from "components/common/buttons/SubmitButtonComponent";
import { UserIcon } from "icons/IconsLibrary";
import { passwordRecovery } from "redux/user/userActions";

const PasswordRecovery = () => {
  const dispatch = useDispatch();

  const errorReset = useSelector((state) => state.user.errorReset);
  const isLoading = useSelector((state) => state.user.isPendingReset);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({ email: "" });
  }, [errorReset]);

  const onSubmit = (data) => {
    dispatch(passwordRecovery(data.email));
  };

  return (
    <div className="c-password-recovery">
      <div className="c-password-recovery__header">
        <Image
          className="c-password-recovery__logo"
          alt="alva Live"
          width="80"
          height="80"
          src={`${process.env.PUBLIC_URL}/img/alva-iso-white.svg`}
        />
        <div className="c-password-recovery__title-container">
          <h1 className="c-password-recovery__title">Password recovery</h1>
        </div>
      </div>
      <form
        className="c-password-recovery__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="c-password-recovery__help">
          Please enter your email address. We'll send you instructions to create
          a new password shortly
        </div>
        <div className="c-password-recovery__input">
          <ControlledInput
            control={control}
            rules={{ required: true }}
            className="c-input"
            id="standard-basic"
            label="Your email address"
            type="text"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <UserIcon />
                </InputAdornment>
              ),
            }}
            name="email"
            error={errors.email}
            helperText={errors.email && "Empty email"}
          />
        </div>
        <SubmitButtonComponent isLoading={isLoading}>
          Send
        </SubmitButtonComponent>
        <Link className="c-password-recovery__link" href="/login">
          <a className="c-password-recovery__link">Back to login</a>
        </Link>
      </form>
    </div>
  );
};

export default PasswordRecovery;

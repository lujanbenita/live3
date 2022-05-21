import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { InputAdornment } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

import ControlledInput from "../common/inputs/ControlledInput";
import SubmitButtonComponent from "../common/buttons/SubmitButtonComponent";
import { resetPassword } from "../../redux/user/userActions";
import { validateNewPassword } from "./validation";
import { LockIcon } from "../../icons/IconsLibrary";

const ChangePasswordComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { control, reset, handleSubmit } = useForm();
  const errorLogin = useSelector((state) => state.user.errorLogin);
  const isLoading = useSelector((state) => state.user.isPendingReset);

  const onSubmit = (data) => {
    if (validateNewPassword(data)) {
      const { un, tkn } = router.query;
      dispatch(resetPassword({ ...data, username: un, token: tkn }));
    }
  };

  useEffect(() => {
    if (router.isReady && router.query.tkn === undefined) {
      return router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    reset({ username: "", password: "" });
  }, [errorLogin]);

  return (
    <div className="c-reset-password">
      <div className="c-reset-password__header">
        <Image
          className="c--reset-password__logo"
          alt="alva Live"
          width="80"
          height="80"
          src={`${process.env.PUBLIC_URL}/img/alva-iso-white.svg`}
        />
        <div className="c-reset-password__title-container">
          <h1 className="c-reset-password__title">New Password</h1>
        </div>
      </div>
      <form
        className="c-reset-password__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="c-reset-password__input">
          <ControlledInput
            control={control}
            rules={{ required: true }}
            className="c-input"
            id="standard-password-input"
            label="New Password"
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            name="newPassword"
          />
        </div>
        <div className="c-reset-password__input">
          <ControlledInput
            control={control}
            rules={{ required: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            name="confirmNewPassword"
            type="password"
            className="c-input"
            id="standard-password-input"
            label="Confirm new Password"
          />
        </div>
        <div className="c-reset-password__button">
          <SubmitButtonComponent isLoading={isLoading}>
            Send
          </SubmitButtonComponent>
        </div>
        <Link className="c-reset-password__link" href="/login">
          <a className="c-reset-password__link">Back to login</a>
        </Link>
      </form>
    </div>
  );
};

export default ChangePasswordComponent;

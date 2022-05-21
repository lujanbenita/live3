import Image from "next/image";
import Link from "next/link";
import { InputAdornment } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import ControlledInput from "components/common/inputs/ControlledInput";
import ControlledSwitch from "components/common/inputs/ControlledSwitch";
import SubmitButtonComponent from "components/common/buttons/SubmitButtonComponent";

import { LockIcon, UserIcon } from "icons/IconsLibrary";

import formatDateRangeResponse from "utils/servicesFormatter/responses/formatDateRange";
import formatFilterValues from "utils/servicesFormatter/responses/formatFilterValues";
import { storeToken } from "utils/Auth";

import { setUserData } from "redux/user/userActions";
import { setData } from "redux/searchObject/actions";
import { DELETE_STORAGE } from "redux/combineReducers";

import useLogin from "hooks/rq/login/useLogin";
import cookie from "js-cookie";

const formatDefaultValues = (searchObject) => ({
  ...searchObject,
  filterValues: formatFilterValues(searchObject.filterValues),
  dateRange: formatDateRangeResponse(searchObject.dateRange),
  tags: [
    ...searchObject.tags,
    ...formatFilterValues(searchObject.filterValues).textTags,
  ],
});

const LoginComponent = () => {
  const dispatch = useDispatch();
  const [errorsForm, setErrorsForms] = useState([]);
  const { mutate, isError, isLoading, data: user } = useLogin();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: { username: "", password: "", rememberMe: false },
  });

  useEffect(() => {
    if (isLoading || !user?.token) {
      return;
    }
    storeToken(
      user.token,
      getValues("rememberMe"),
      {
        userName: getValues("username"),
        password: getValues("password"),
      },
      user.liveAccess
    );

    dispatch(setUserData(user));
    if (user.jsonData && user.jsonData !== "null") {
      const jsonData = JSON.parse(user.jsonData);

      if (jsonData?.searchObject) {
        dispatch(setData(formatDefaultValues(jsonData.searchObject)));
      }
    }
  }, [isLoading, user]);

  const onSubmit = (data) => {
    setErrorsForms([]);
    dispatch({
      type: DELETE_STORAGE,
    });
    mutate(data);
  };

  useEffect(() => {
    reset({ username: "", password: "", rememberMe: false });
    setErrorsForms([]);
  }, [isError]);

  useEffect(() => {
    const anyErrors = [];

    if (getValues().username.length === 0 && errors.username) {
      anyErrors.push({
        name: "username",
        message: "Required",
      });
    } else {
      anyErrors.filter((error) => error.name !== "username");
    }

    if (getValues().password.length === 0 && errors.password) {
      anyErrors.push({
        name: "password",
        message: "Required",
      });
    } else {
      anyErrors.filter((error) => error.name !== "password");
    }

    if (errors.length === 0) {
      return false;
    }

    setErrorsForms(anyErrors);
  }, [errors.username, errors.password]);

  useEffect(() => {
    const rawCredentials = cookie.get("credentials");

    if (rawCredentials) {
      const { userName, password } = JSON.parse(rawCredentials);
      reset({
        username: userName,
        password,
        rememberMe: true,
      });
    }
  }, []);

  return (
    <div className="c-login">
      <div className="c-login__header">
        <Image
          className="c-login__logo"
          alt="alva live"
          width="80"
          height="80"
          src={`${process.env.PUBLIC_URL}/img/alva-iso-white.svg`}
        />
        <div className="c-login__title-container">
          <h1 className="c-login__title">
            Welcome to <strong>alva.live</strong>
          </h1>
        </div>
      </div>
      <form className="c-login__form" onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          control={control}
          rules={{ required: true }}
          className="c-input c-login__field"
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
          name="username"
          error={errorsForm.find((e) => e.name === "username")}
        />

        <ControlledInput
          control={control}
          rules={{ required: true }}
          className="c-input c-login__field"
          id="standard-password-input"
          label="Your Password"
          type="password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LockIcon />
              </InputAdornment>
            ),
          }}
          name="password"
          error={errorsForm.find((e) => e.name === "password")}
        />

        <div className="c-switch">
          <span className="c-switch__label">Remember me</span>
          <ControlledSwitch
            name="rememberMe"
            control={control}
            defaultValue={false}
          />
        </div>

        <SubmitButtonComponent isLoading={isLoading}>
          Access
        </SubmitButtonComponent>
        <Link
          className="c-login__link"
          href="/password-recovery"
          as="/password-recovery"
        >
          <a className="c-login__link">Forgot your password</a>
        </Link>
      </form>
    </div>
  );
};

export default LoginComponent;

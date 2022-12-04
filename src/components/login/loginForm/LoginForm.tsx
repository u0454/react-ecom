import { child, get, getDatabase, ref, set } from "firebase/database";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productsApi, useGetUserInforQuery } from "../../../app/apiSlice";
import { dbRef } from "../../../app/firebase-config";
import {
  useAppDispatch,
  useAppSelector,
  useUser,
} from "../../../app/hooks/hooks";
import { PostData } from "../../../app/PostDataSlice";
import FormInput from "../../ui/form/formInput/FormInput";
import {
  emailValid,
  getEmail,
  passwordValid,
  resetFormState,
} from "../../ui/form/formInput/FormInputSlice";
import FormLink from "../../ui/form/formLink/FormLink";
import RememberCheckBox from "../../ui/form/rememberCheckbox/RememberCheckBox";
import styles from "./LoginForm.module.scss";
import { loginFormData } from "./LoginFormSlice";
import { login } from "./LoginFormSlice";

const LoginForm = () => {
  const formInput = useAppSelector((state) => state.formInput);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, userId } = useAppSelector((state) => state.loginForm);

  useEffect(() => {
    if (userId) {
      alert("Login succeed");
      navigate("/shop");
      dispatch(login());
    }
  }, [userId]);

  const LoginSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      loginFormData({
        email: formInput.emailValue,
        password: formInput.passwordValue,
        returnSecureToken: true,
        errorMessage: "Login Error!!",
      })
    );

    dispatch(resetFormState());
  };

  return (
    <form onSubmit={LoginSubmitHandler} className={styles.formContainer}>
      <FormInput buttonText={"LOGIN ➝"} />
      <RememberCheckBox />
      <FormLink link={"register"} content={"REGISTER CHOCO ACCOUNT"} />
      {isLoading && <h3>LOADING......</h3>}
    </form>
  );
};

export default LoginForm;

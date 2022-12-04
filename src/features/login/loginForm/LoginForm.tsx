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
import FormInput from "../../formAuth/FormAuth";
import {
  emailValid,
  getEmail,
  passwordValid,
  resetFormState,
} from "../../formAuth/formAuthSlice";
import FormLink from "../../../components/form/formLink/FormLink";
import RememberCheckBox from "../../../components/form/rememberCheckbox/RememberCheckBox";
import styles from "./LoginForm.module.scss";
import { postLoginData } from "./loginFormSlice";
import { login } from "./loginFormSlice";

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
      postLoginData({
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
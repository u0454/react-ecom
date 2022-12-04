import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/hooks";
import FormInput from "../../formAuth/FormAuth";
import { resetFormState } from "../../formAuth/formAuthSlice";
import FormLink from "../../../components/form/formLink/FormLink";
import { resetSignUpToken } from "./signUpFormSlice";
import styles from "./SignUpForm.module.scss";
import { postSignUpData } from "./signUpFormSlice";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const formInput = useAppSelector((state) => state.formInput);
  const navigate = useNavigate();
  const { signUpToken } = useAppSelector((state) => state.signUpForm);

  const SignUpSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Sign Up account
    dispatch(
      postSignUpData({
        email: formInput.emailValue,
        password: formInput.passwordValue,
        returnSecureToken: true,
        errorMessage: "Register Error!!",
      })
    );
    dispatch(resetFormState());

    // Create userInfor in firebase
  };

  useEffect(() => {
    if (signUpToken) {
      alert("Register succeed!!");
      navigate("/login");
      dispatch(resetSignUpToken());
    }
  }, [signUpToken]);

  return (
    <form onSubmit={SignUpSubmitHandler} className={styles.formContainer}>
      <FormInput buttonText={"SIGN UP ➝"} />
      <FormLink link={"login"} content={"LOGIN HERE"} />
    </form>
  );
};

export default SignUpForm;
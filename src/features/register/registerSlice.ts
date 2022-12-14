import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKey } from "../../app/firebase-config";

interface RegisterForm {
  email: string;
  password: string;
  returnSecureToken: boolean;
  errorMessage: string;
}

export const postSignUpData = createAsyncThunk(
  "sign/registerFormStatus",
  async (data: RegisterForm) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
        {
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        }
      );

      return response.data;
    } catch (err) {
      alert(data.errorMessage);
    }
  }
);

interface RegisterState {
  signUpUserId: null | string;
  signUpToken: null | string;
  isLoading: boolean;
  registerError: boolean;
}

const initialState: RegisterState = {
  signUpUserId: null,
  signUpToken: null,
  isLoading: false,
  registerError: false,
};

const registerSlice = createSlice({
  name: "registerForm",
  initialState,
  reducers: {
    resetSignUpToken(state) {
      state.signUpToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSignUpData.pending, (state) => {
      state.isLoading = true;
      state.registerError = false;
    });
    builder.addCase(postSignUpData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.registerError = false;
      if (!action.payload) return;
      state.signUpToken = action.payload.idToken;
      state.signUpUserId = action.payload.localId;
    });
    builder.addCase(postSignUpData.rejected, (state) => {
      state.isLoading = false;
      state.registerError = true;
    });
  },
});

export const { resetSignUpToken } = registerSlice.actions;

export default registerSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { account } from "../../appWrite/auth";
import { ID } from "appwrite";

const initialState = {
  user: null,
  sessionID: null,
  isLoading: false,
};

/* export const signInWithEmailAndPassoword = createAsyncThunk(
  "auth/signIn",
  (email, password, name) => {
    return account
      .create(ID.unique(), email, password, name)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
); */

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    signUp: (state, action) => {
      console.log(action.payload);
      state.user = action.payload.user;
      state.sessionID = action.payload.id;
    },
    logout: (state, action) => {
      state.user = null;
      state.sessionID = null;
    },
  },
});

export const { signUp, logout } = signUpSlice.actions;

export default signUpSlice.reducer;

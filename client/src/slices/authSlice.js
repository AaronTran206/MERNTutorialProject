import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../api/index.js"

export const signup = createAsyncThunk("", async (d) => {
  const formData = d
  try {
    //signup user
    const { data } = await api.signUp(formData)

    return data
  } catch (error) {
    console.log(error)
  }
})

export const signin = createAsyncThunk("", async (d) => {
  const formData = d
  try {
    //login user
    const { data } = await api.signIn(formData)

    return data
  } catch (error) {
    console.log(error)
  }
})

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData: null,
  },
  reducers: {
    setAuthSlice: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }))
      state.authData = action.payload
    },
    setAuthLogoutSlice: (state, action) => {
      localStorage.clear()
      state.authData = action.payload
    },
  },
  extraReducers: {
    //Sign Up
    [signup.pending]: (state, action) => {
      state.status = "loading"
    },
    [signup.fulfilled]: (state, action) => {
      state.status = "success"
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }))
      state.authData = action.payload
    },
    [signup.rejected]: (state, action) => {
      state.status = "failed"
    },

    //Sign In
    [signin.pending]: (state, action) => {
      state.status = "loading"
    },
    [signin.fulfilled]: (state, action) => {
      state.status = "success"
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }))
      state.authData = action.payload
    },
    [signin.rejected]: (state, action) => {
      state.status = "failed"
    },
  },
})

export const { setAuthSlice, setAuthLogoutSlice } = authSlice.actions

export const selectAuthData = (state) => state.auth.authData

export default authSlice.reducer

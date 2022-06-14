import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const signup = createAsyncThunk("", async (data) => {
  const { formData, navigate } = data
  try {
    //signup user

    //navigate back to home page
    navigate("/")
  } catch (error) {
    console.log(error)
  }
})

export const signin = createAsyncThunk("", async (data) => {
  const { formData, navigate } = data
  try {
    //login user

    //navigate back to home page
    navigate("/")
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
})

export const { setAuthSlice, setAuthLogoutSlice } = authSlice.actions

export const selectAuthData = (state) => state.auth.authData

export default authSlice.reducer

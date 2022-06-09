import { createSlice } from "@reduxjs/toolkit"

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

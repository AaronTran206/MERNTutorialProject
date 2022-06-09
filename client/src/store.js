import { configureStore } from "@reduxjs/toolkit"
import postsSlice from "./slices/postsSlice.js"
import authSlice from "./slices/authSlice.js"

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    auth: authSlice,
  },
})

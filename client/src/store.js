import { configureStore } from "@reduxjs/toolkit"
import postsSlice from "./slices/postsSlice.js"

export const store = configureStore({
  reducer: {
    posts: postsSlice,
  },
})

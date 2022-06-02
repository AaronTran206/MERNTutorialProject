import { createSlice } from "@reduxjs/toolkit"

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    fetchAllPosts: (state, action) => {
      state.posts = action.payload
    },
    createPosts: (state, action) => {
      state.posts = action.payload
    },
  },
})

export const { fetchAllPosts, createPosts } = postsSlice.actions

export default postsSlice.reducer

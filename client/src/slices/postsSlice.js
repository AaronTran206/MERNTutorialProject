import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api"

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload
    },
    createPosts: (state, action) => {
      state.posts = action.payload
    },
  },
})

//imported the api call to our backend server from ../api
//then we created a async thunk function that makes a call to the api that we created with axios
//we return the data to the component that requests that data
export const fetchPosts = createAsyncThunk("", async () => {
  try {
    const response = await api.fetchPosts()
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})

export const { getPosts, createPosts } = postsSlice.actions

export const selectAllPosts = (state) => state.posts.posts

export default postsSlice.reducer

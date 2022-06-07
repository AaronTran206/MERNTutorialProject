import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api"

//imported the api call to our backend server from ../api
//then we created a async thunk function that makes a call to the api that we created with axios
//we return the data to the component that requests that data
export const fetchPost = createAsyncThunk("posts/fetchPost", async () => {
  try {
    const response = await api.fetchPost()

    return response.data
  } catch (error) {
    console.log(error.message)
  }
})

export const createPost = createAsyncThunk("posts/createPost", async (post) => {
  try {
    const response = await api.createPost(post)

    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  extraReducers: {
    [createPost.pending]: (state, action) => {
      state.status = "loading"
    },
    [createPost.fulfilled]: (state, action) => {
      state.status = "success"
      state.posts = [...state.posts, action.payload]
    },
    [createPost.rejected]: (state, action) => {
      state.status = "failed"
    },
    [fetchPost.pending]: (state, action) => {
      state.status = "loading"
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.status = "success"
      state.posts = action.payload
    },
    [fetchPost.rejected]: (state, action) => {
      state.status = "failed"
    },
  },
})

export const selectAllPosts = (state) => state.posts.posts

export default postsSlice.reducer

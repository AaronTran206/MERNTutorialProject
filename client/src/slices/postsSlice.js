import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api"

//imported the api call to our backend server from ../api
//then we created a async thunk function that makes a call to the api that we created with axios
//we return the data to the component that requests that data
export const fetchPost = createAsyncThunk("/posts/fetchPost", async (page) => {
  try {
    const { data } = await api.fetchPost(page)

    return data
  } catch (error) {
    console.error(error)
  }
})

export const getPost = createAsyncThunk("/posts/getPost", async (id) => {
  try {
    const { data } = await api.getPost(id)

    return data
  } catch (error) {
    console.error(error)
  }
})

export const fetchPostsbySearch = createAsyncThunk(
  "/posts/fetchPostsbySearch",
  async (searchQuery) => {
    try {
      const {
        data: { data },
      } = await api.fetchPostsbySearch(searchQuery)

      return data
    } catch (error) {
      console.error(error)
    }
  }
)

export const createPost = createAsyncThunk(
  "/posts/createPost",
  async (data) => {
    const { post, navigate } = data
    try {
      const { data } = await api.createPost(post)

      navigate(`/posts/${data._id}`)
      return data
    } catch (error) {
      console.error(error)
    }
  }
)

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (newPost) => {
    const { id, post } = newPost
    try {
      const { data } = await api.updatePost(id, post)

      return data
    } catch (error) {
      console.error(error)
    }
  }
)

export const likePost = createAsyncThunk("/posts/likePost", async (id) => {
  try {
    const { data } = await api.likePost(id)

    return data
  } catch (error) {
    console.error(error)
  }
})

export const commentPost = createAsyncThunk(
  "/posts/commentPost",
  async (data) => {
    const { finalComment, id } = data

    try {
      const { data } = await api.commentPost(finalComment, id)

      return data
    } catch (error) {
      console.error(error)
    }
  }
)

export const deletePost = createAsyncThunk("/posts/deletePost", async (id) => {
  try {
    await api.deletePost(id)
    return id
  } catch (error) {
    console.error(error)
  }
})

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    post: null,
    currentPage: 1,
    numberOfPages: 1,
    status: null,
  },
  extraReducers: {
    //fetchPost
    [fetchPost.pending]: (state, action) => {
      state.status = "loading"
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.status = "success"
      state.posts = action.payload.data
      state.currentPage = action.payload.currentPage
      state.numberOfPages = action.payload.numberOfPages
    },
    [fetchPost.rejected]: (state, action) => {
      state.status = "failed"
    },

    //getPost
    [getPost.pending]: (state, action) => {
      state.status = "loading"
    },
    [getPost.fulfilled]: (state, action) => {
      state.status = "success"
      state.post = action.payload
    },
    [getPost.rejected]: (state, action) => {
      state.status = "failed"
    },

    //fetchPostsbySearch
    [fetchPostsbySearch.pending]: (state, action) => {
      state.status = "loading"
    },
    [fetchPostsbySearch.fulfilled]: (state, action) => {
      state.status = "success"
      state.posts = action.payload
    },
    [fetchPostsbySearch.rejected]: (state, action) => {
      state.status = "failed"
    },

    //createPost
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

    //updatePost
    [updatePost.pending]: (state, action) => {
      state.status = "loading"
    },
    [updatePost.fulfilled]: (state, action) => {
      state.status = "success"
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )
    },
    [updatePost.rejected]: (state, action) => {
      state.status = "failed"
    },

    //likePost
    [likePost.pending]: (state, action) => {
      state.status = "success"
    },
    [likePost.fulfilled]: (state, action) => {
      state.status = "success"
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )
    },
    [likePost.rejected]: (state, action) => {
      state.status = "failed"
    },

    //commentPost
    [commentPost.pending]: (state, action) => {
      state.status = "success"
    },
    [commentPost.fulfilled]: (state, action) => {
      state.status = "success"
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )
    },
    [commentPost.rejected]: (state, action) => {
      state.status = "failed"
    },

    //deletePost
    [deletePost.pending]: (state, action) => {
      state.status = "success"
    },
    [deletePost.fulfilled]: (state, action) => {
      state.status = "success"
      state.posts = state.posts.filter((post) => post._id !== action.payload)
    },
    [deletePost.rejected]: (state, action) => {
      state.status = "failed"
    },
  },
})

export const selectAllPosts = (state) => state.posts.posts

export default postsSlice.reducer

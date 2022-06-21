//easier to make API calls with axios
import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:5000" })

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`
  }

  return req
})

//axios helps fetch data from the URL
export const fetchPost = (page) => API.get(`/posts?page=${page}`)

export const getPost = (id) => API.get(`/posts/${id}`)

//fetch posts by search term
//query parameters start with question mark then variable name and is equal to something
//we are sending searchTerm and search tags within the searchQuery object
export const fetchPostsbySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  )

//axios posts data to the db stored in the url
//the backend database is also connecting data to the url
export const createPost = (newPost) => API.post("/posts", newPost)

//find the document that matches the id and patch it
export const updatePost = (id, updatedPost) => {
  return API.patch(`/posts/${id}`, updatedPost)
}

export const likePost = (id) => {
  return API.patch(`/posts/${id}/likePost`)
}

//delete the post that matches the id
export const deletePost = (id) => {
  return API.delete(`/posts/${id}`)
}

//sign in and sign up features
export const signIn = (formData) => API.post("/user/signin", formData)
export const signUp = (formData) => API.post("/user/signup", formData)

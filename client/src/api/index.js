//easier to make API calls with axios
import axios from "axios"

const url = "http://localhost:5000/posts"

//axios helps fetch data from the URL
export const fetchPost = () => axios.get(url)

//axios posts data to the db stored in the url
//the backend database is also connecting data to the url
export const createPost = (newPost) => axios.post(url, newPost)

//find the document that matches the id and patch it
export const updatePost = (id, updatedPost) => {
  return axios.patch(`${url}/${id}`, updatedPost)
}

//delete the post that matches the id
export const deletePost = (id) => {
  return axios.delete(`${url}/${id}`)
}

//easier to make API calls with axios
import axios from "axios"

const url = "http://localhost:5000/posts"

//axios helps fetch data from the URL
export const fetchPost = () => axios.get(url)
export const createPost = (newPost) => axios.post(url, newPost)

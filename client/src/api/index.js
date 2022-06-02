//easier to make API calls with axios
import axios from "axios"

const url = "http://localhost:5000/posts"

export const fetchPosts = () => axios.get(url)

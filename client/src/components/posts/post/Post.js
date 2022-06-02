import React from "react"
import useStyles from "./styles.js"
import { useSelector } from "react-redux"
import { selectAllPosts } from "../../../slices/postsSlice.js"

const Post = () => {
  const classes = useStyles()
  const posts = useSelector(selectAllPosts)

  console.log(posts)
  return <h1>Post</h1>
}

export default Post

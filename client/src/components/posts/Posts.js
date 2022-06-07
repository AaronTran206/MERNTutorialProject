import React from "react"
import Post from "./post/Post.js"
import useStyles from "./styles.js"
import { useDispatch, useSelector } from "react-redux"
import { selectAllPosts } from "../../slices/postsSlice.js"
import { Grid, CircularProgress } from "@material-ui/core"

const Posts = ({ setCurrentId }) => {
  const classes = useStyles()
  const posts = useSelector(selectAllPosts)

  console.log(posts)
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Posts

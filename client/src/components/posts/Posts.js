import React from "react"
import Post from "./post/Post.js"
import useStyles from "./styles.js"
import { useSelector } from "react-redux"
import { Grid, CircularProgress } from "@material-ui/core"

const Posts = ({ setCurrentId }) => {
  const classes = useStyles()
  const { posts, status } = useSelector((state) => state.posts)

  if (!posts.length && status === "success") return "No posts :("

  return status === "loading" ? (
    <div className={classes.loadingIcon}>
      <CircularProgress size="8rem" />
    </div>
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Posts

import React from "react"
import useStyles from "./styles.js"
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { getPosts, fetchPosts } from "../slices/postsSlice"
import Posts from "../components/posts/Posts.js"
import Form from "../components/form/Form.js"
import memories from "../images/memories.png"
import { useEffect } from "react"

const App = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts)
  }, [])
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App

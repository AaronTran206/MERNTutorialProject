import React, { useState } from "react"
import Posts from "../posts/Posts.js"
import Form from "../form/Form.js"
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core"
import { useDispatch } from "react-redux"
import { useNavigate, useLocation, useSearchParams } from "react-router-dom"
import ChipInput from "material-ui-chip-input"
import { fetchPostsbySearch } from "../../slices/postsSlice"
import useStyles from "./styles.js"
import Paginate from "../pagination/Pagination.js"

//custom query hook
function useQuery() {
  const [searchParams, setSearchParams] = useSearchParams()

  return new URLSearchParams(searchParams)
}

const Home = () => {
  //hooks
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const query = useQuery()
  //if no page in URL then the current page must be the first one
  const page = query.get("page") || 1
  const searchQuery = query.get("searchQuery")

  //states
  const [currentId, setCurrentId] = useState(null)
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])

  const handleKeyDown = (e) => {
    //key code for Enter is 13
    if (e.keyCode === 13) {
      //search posts
      searchPosts()
    }
  }

  //add tags to tag array
  const handleAdd = (tag) => setTags([...tags, tag])

  //delete tags from tag array
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete))

  const searchPosts = () => {
    if (search.trim() || tags.length) {
      //dispatch -> fetch search posts
      //cannot send an array to URL parameters. Must be a string. Use .join() method.
      dispatch(fetchPostsbySearch({ search, tags: tags.join("+") }))

      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join("+")}`
      )
    } else {
      //if no search term then go back to main page
      navigate("/")
    }
  }

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          className={classes.gridContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPosts}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Paginate page={page} className={classes.pagination} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home

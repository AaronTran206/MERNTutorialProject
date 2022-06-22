import express from "express"
import {
  fetchPost,
  getPost,
  fetchPostsbySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from "../controllers/posts.js"
import auth from "../middleware/auth.js"

const router = express.Router()

//order matters for express router. Requests are handled in a 'first come first serve' basis

//get data based on search parameters
router.get("/search", fetchPostsbySearch)

//get single post
router.get("/:id", getPost)

//get retrieves data from a database
router.get("/", fetchPost)

//post adds data to a database
router.post("/", auth, createPost)

//patch is used for updating existing documents
router.patch("/:id", auth, updatePost)

//patch to update likes
router.patch("/:id/likePost", auth, likePost)

//patch to update likes
router.post("/:id/commentPost", auth, commentPost)

//delete document
router.delete("/:id", auth, deletePost)

export default router

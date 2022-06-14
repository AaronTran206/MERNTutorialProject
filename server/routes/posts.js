import express from "express"
import {
  fetchPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js"
import auth from "../middleware/auth.js"

const router = express.Router()

//get retrieves data from a database
router.get("/", fetchPost)

//post adds data to a database
router.post("/", auth, createPost)

//patch is used for updating existing documents
router.patch("/:id", auth, updatePost)

//patch to update likes
router.patch("/:id/likePost", auth, likePost)

//delete document
router.delete("/:id", auth, deletePost)

export default router

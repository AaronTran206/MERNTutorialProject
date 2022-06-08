import express from "express"
import {
  fetchPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js"

const router = express.Router()

//get retrieves data from a database
router.get("/", fetchPost)

//post adds data to a database
router.post("/", createPost)

//patch is used for updating existing documents
router.patch("/:id", updatePost)

//patch to update likes
router.patch("/:id/likePost", likePost)

//delete document
router.delete("/:id", deletePost)

export default router

//Separate post functions and route file for greater scalability. Once the file size gets bigger, it will be easier to see the different functions in here.
import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export const fetchPost = async (req, res) => {
  const { page } = req.query

  try {
    const LIMIT = 8
    //passing page number through req.query will make it a string. Convert back to number.
    const startIndex = (Number(page) - 1) * LIMIT
    const total = await PostMessage.countDocuments({})

    //finding something in a model takes time and, is thus, asynchronous. Must convert this function to an async function and put await on the find method
    //sort posts from newest to oldest
    //limit the fetch to a certain number of posts
    //skip to the index indicated
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex)

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//get single post
export const getPost = async (req, res) => {
  const { id } = req.params

  try {
    const post = await PostMessage.findById(id)

    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//params and query are different
//QUERY -> /posts?page=1 -> page = 1
//PARAMS -> /posts/:id -> id = 123
//both are ok. Query for filtering data. Params to get specific data.
export const fetchPostsbySearch = async (req, res) => {
  const { searchQuery, tags } = req.query
  try {
    const title = new RegExp(searchQuery, "i")

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split("+") } }],
    })

    res.json({ data: posts })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  const post = req.body

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  })
  try {
    await newPost.save()

    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params
  const post = req.body

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id")

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  )

  res.json(updatedPost)
}

export const deletePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id")

  await PostMessage.findByIdAndRemove(id)

  res.json({ message: "Post deleted!" })
}

export const likePost = async (req, res) => {
  const { id } = req.params

  if (!req.userId) return res.json({ message: "You must login to like posts!" })

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id")

  const post = await PostMessage.findById(id)

  //check if this user is in the post likes array (array that contains all the users that liked the post)
  const index = post.likes.findIndex((id) => id === String(req.userId))

  if (index === -1) {
    //like the post
    post.likes.push(req.userId)
  } else {
    //delete the post
    post.likes = post.likes.filter((id) => id !== String(req.userId))
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  })

  res.json(updatedPost)
}

//Separate post functions and route file for greater scalability. Once the file size gets bigger, it will be easier to see the different functions in here.
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
  try {
    //finding something in a model takes time and, is thus, asynchronous. Must convert this function to an async function and put await on the find method
    const postMessages = await PostMessage.find()

    res.status(200).json(postMessages)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  const post = req.body

  const newPost = new PostMessage(post)
  try {
    await newPost.save()

    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

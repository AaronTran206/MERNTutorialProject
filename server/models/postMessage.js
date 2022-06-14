import mongoose from "mongoose"

//mongoose allows us to create different templates for our documents that we will send to the MongoDB database
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

//Create a model out of the Schema that was defined then rename it Post Message
const PostMessage = mongoose.model("PostMessage", postSchema)

//Export the model so that later, we can use the MongoDB commands on it.
export default PostMessage

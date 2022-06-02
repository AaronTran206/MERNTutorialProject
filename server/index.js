//dependencies
import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"

//routes for when user visit the url
import postRoutes from "./routes/posts.js"

const app = express()

//setup
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

//every route inside of the postRoutes will start with '/posts'
app.use("/posts", postRoutes)

//mongoDB Atlas
const CONNECTION_URL =
  "mongodb+srv://aarontran206:eMtEnGsDSHSnX6YZ@cluster0.yzrot.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000

//mongoose setup
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message))

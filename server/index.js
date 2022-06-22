//dependencies
import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

//routes for when user visit the url
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"

const app = express()
dotenv.config()

//setup
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

//every route inside of the postRoutes will start with '/posts'
app.use("/posts", postRoutes)
//every route inside of userRoutes will start with /user
app.use("/user", userRoutes)

app.get("/", (req, res) => {
  res.send("App is running")
})

//mongoDB Atlas
const PORT = process.env.PORT || 5000

//mongoose setup
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message))

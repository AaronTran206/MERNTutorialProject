import jwt from "jsonwebtoken"

// Example
// 1) user wants to liked post
// 2) middleware verifies then called next() if everything is okay
// 3) call likePost controller function

const auth = async (req, res, next) => {
  try {
    //get token from request
    const token = req.headers.authorization.split(" ")[1]

    //if token length is greater than 500 then it is Google auth, otherwise it is our authentication system
    const isCustomAuth = token.length < 500

    let decodedData

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test")

      //send user id to the controller functions in the backend
      req.userId = decodedData?.id
    } else {
      decodedData = jwt.decode(token)

      //Google's version of id to differentiate between users
      req.userId = decodedData?.sub
    }

    next()
  } catch (error) {
    console.log(error)
  }
}

export default auth

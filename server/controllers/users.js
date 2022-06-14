//bcrypt is used for hashing the passwords so in the event that the database is hacked, the passwords will not be readable
//json web tokens are for storing a user in a browser for a period of time. They will stay logged in for a specified period of time
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//import Schema from models
import User from "../models/user.js"

export const signup = async (req, res) => {
  const { email, password, confirmPassword, given_name, family_name } = req.body

  try {
    //if there is already an account with the email return an error message
    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({ message: "User already exists" })

    //if the password and confirm password does not match then return an error message
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" })

    //hash the password to make site more secure
    const hashedPassword = await bcrypt.hash(password, 12)

    //create a result object to send back to frontend
    const result = await User.create({
      email,
      password: hashedPassword,
      given_name: given_name,
      family_name: family_name,
    })

    //json web token that expires in specified time
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1hr",
    })

    //successful signup action
    res.status(200).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" })
  }
}

export const signin = async (req, res) => {
  const { email, password } = req.body

  try {
    //find user that matches the email in the database
    const existingUser = await User.findOne({ email })

    //if user doesn't exist in database then return error messasge
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." })

    //compare typed in password with the password on the existing user object
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )

    //if the password and the existing password are different, return an error message
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Password." })

    //create json web token that expires in specified time
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    )

    //successful signin action
    res.status(200).json({ result: existingUser, token })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" })
  }
}

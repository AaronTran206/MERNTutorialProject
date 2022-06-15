import React, { useState } from "react"
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core"
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google"
import { decodeToken } from "react-jwt"
import { useDispatch } from "react-redux"
import { setAuthSlice, signup, signin } from "../../slices/authSlice.js"
import { useNavigate } from "react-router-dom"

import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Input from "./input.js"
import useStyles from "./styles.js"

const initialState = {
  given_name: "",
  family_name: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState(initialState)

  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //when submitted, send form data to backend to login
  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSignup) {
      //sign up the user
      dispatch(signup(formData)).then(() => {
        navigate("/")
      })
    } else {
      //sign in the user
      dispatch(signin(formData)).then(() => {
        navigate("/")
      })
    }
  }

  //change formdata on input field change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleShowPassword = () => setShowPassword(!showPassword)
  const switchMode = () => {
    setIsSignUp(!isSignup)
    setShowPassword(false)
  }

  const googleSuccess = async (res) => {
    //decode the response from Google authentication
    const decodedToken = await decodeToken(res.credential)
    console.log(res.clientId === decodedToken.azp)

    //dispatch decoded results to redux global state
    dispatch(setAuthSlice({ result: decodedToken, token: res.credential }))

    //return back to home after sign-in
    navigate("/")
  }

  const googleError = (error) => {
    console.log(error)
  }

  return (
    <Container component={"main"} maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="given_name"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="family_name"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              autoFocus
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleError}
            theme="filled_blue"
          />
          <Grid container justifyContent="flex-start">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
export default Auth

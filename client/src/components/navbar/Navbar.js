import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core"
import memoriesLogo from "../../images/memories-Logo.png"
import memoriesText from "../../images/memories-Text.png"
import useStyles from "./styles.js"
import { setAuthLogoutSlice } from "../../slices/authSlice"
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { decodeToken } from "react-jwt"

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")))

    //get token from user token
    const token = user?.token

    //if token scheduled expiry time is less than current date, then logout
    if (token) {
      const decodedToken = decodeToken(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }
  }, [location])

  const logout = () => {
    dispatch(setAuthLogoutSlice(null))
    navigate("/auth")
    setUser(null)
  }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45" />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="icon"
          height="40"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result?.given_name}
              src={user?.result?.picture}
            >
              {user?.result?.given_name?.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result?.given_name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

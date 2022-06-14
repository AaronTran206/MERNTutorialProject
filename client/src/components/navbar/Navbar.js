import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core"
import memories from "../../images/memories.png"
import useStyles from "./styles.js"
import { selectAuthData, setAuthLogoutSlice } from "../../slices/authSlice"
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")))
  }, [location])

  const logout = () => {
    dispatch(setAuthLogoutSlice(null))
    navigate("/auth")
    setUser(null)
  }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
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

import React from "react"
import { Container } from "@material-ui/core"
import Navbar from "../components/navbar/Navbar.js"
import Home from "../components/home/Home.js"
import Auth from "../components/auth/Auth.js"
import PostDetails from "../components/postDetails/PostDetails.js"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"))

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="1047237805781-uk5jjhbjb4nhg3tv2j5njib1lr98jp4u.apps.googleusercontent.com">
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate replace={true} to="/posts" />} />
            <Route path="/posts" exact element={<Home />} />
            <Route path="/posts/search" exact element={<Home />} />
            <Route path="/posts/:id" exact element={<PostDetails />} />
            <Route
              path="/auth"
              element={!user ? <Auth /> : <Navigate to="/posts" />}
            />
          </Routes>
        </Container>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App

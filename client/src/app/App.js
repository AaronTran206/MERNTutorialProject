import React from "react"
import { Container } from "@material-ui/core"
import Navbar from "../components/navbar/Navbar.js"
import Home from "../components/home/Home.js"
import Auth from "../components/auth/Auth.js"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"

const App = () => {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="1047237805781-uk5jjhbjb4nhg3tv2j5njib1lr98jp4u.apps.googleusercontent.com">
        <Container maxWidth="lg">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Container>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App

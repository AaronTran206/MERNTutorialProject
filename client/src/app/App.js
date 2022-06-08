import React from "react"
import { Container } from "@material-ui/core"
import Navbar from "../components/navbar/Navbar.js"
import Home from "../components/home/Home.js"
import Auth from "../components/auth/Auth.js"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App

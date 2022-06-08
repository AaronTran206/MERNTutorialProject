import React from "react"
import { Container } from "@material-ui/core"
import Navbar from "../components/navbar/Navbar.js"
import Home from "../components/home/Home.js"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" exact component={Home} />
          {/* <Route path="/auth" exact component={Auth} /> */}
        </Routes>
        <Home />
      </Container>
    </BrowserRouter>
  )
}

export default App

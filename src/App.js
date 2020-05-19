import React, { Component } from 'react'
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import Home from './Components/Layout/Home'
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Home />
        <Footer/>
      </div>
    )
  }
}
export default App

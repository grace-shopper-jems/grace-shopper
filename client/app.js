import React from 'react'

import {Navbar, Footer, Cart, AuthForm} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <AuthForm />
      <Cart />
      <Routes />
      <Footer />
    </div>
  )
}

export default App

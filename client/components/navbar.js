import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="app">
    <header className="navbar">
      <nav className="navbar__menu">
        <Link to="/home" className="navbar__link">
          HOME
        </Link>
        <Link to="/products" className="navbar__link">
          WATCHES
        </Link>
      </nav>
      <div className="navbar__logo">
        <h1>Jems</h1>
      </div>
      <div className="navbar__login">
        <div className="navbar__position">
          <Link to="/register">REGISTER</Link>
          {isLoggedIn ? (
            <a href="#" onClick={handleClick}>
              LOG OUT
            </a>
          ) : (
            <Link to="/login">LOG IN</Link>
          )}
          <span>|</span>
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </header>
  </div>
  // <div>
  //   <h1>BOILERMAKER</h1>
  //   <nav>
  //     {isLoggedIn ? (
  //       <div>
  //         {/* The navbar will show these links after you log in */}
  //         <Link to="/home">Home</Link>
  //         <Link to="/products">Products</Link>
  //         <Link to="/cart">Cart</Link>
  //         <a href="#" onClick={handleClick}>
  //           Logout
  //         </a>
  //       </div>
  //     ) : (
  //       <div>
  //         {/* The navbar will show these links before you log in */}
  //         <Link to="/login">Login</Link>
  //         <Link to="/signup">Sign Up</Link>
  //         <Link to="/products">Products</Link>
  //         <Link to="/cart">Cart</Link>
  //         {/* <IconButton aria-label="Shopping Cart">
  //             <AddShoppingCartIcon />
  //           </IconButton> */}
  //       </div>
  //     )}
  //   </nav>
  //   <hr />
  // </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

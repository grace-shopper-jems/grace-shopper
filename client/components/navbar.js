import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'

class Navbar extends Component {
  constructor() {
    super()
    this.logInClick = this.logInClick.bind(this)
  }
  componentDidMount() {
    ;(function() {
      let sidemenu = document.querySelector('.sidemenu')
      let cart = document.querySelector('.cart')
      document.querySelector('.close-sidemenu').onclick = function() {
        sidemenu.classList.toggle('is-visible', false)
      }
      document.querySelector('.toggle-sidemenu').onclick = function() {
        sidemenu.classList.toggle('is-visible', true)
      }
      document.querySelector('.toggle-cart').onclick = function() {
        cart.classList.toggle('is-visible', true)
      }
      document.querySelector('.close-cart').onclick = function() {
        cart.classList.toggle('is-visible', false)
      }
      document.querySelector('.cart__checkout').onclick = function() {
        cart.classList.toggle('is-visible', false)
      }
    })()
  }

  logInClick() {
    let sidemenu = document.querySelector('.sidemenu')
    sidemenu.classList.toggle('is-visible', true)
  }

  render() {
    return (
      <header className="nav">
        <div className="nav__container">
          <div className="nav__left">
            <nav className="nav__menu">
              <NavLink
                to="/home"
                className="nav__link"
                activeClassName="selected"
              >
                HOME
              </NavLink>
              <NavLink
                to="/products"
                className="nav__link"
                activeClassName="selected"
              >
                WATCHES
              </NavLink>
              {this.props.user.id ? (
                <NavLink
                  to="/profile"
                  className="nav__link"
                  activeClassName="selected"
                >
                  PROFILE
                </NavLink>
              ) : (
                ''
              )}
            </nav>
          </div>
          <div className="nav__middle">
            <h1 className="nav__logo">Timeless</h1>
          </div>
          <div className="nav__right">
            {/* {(this.props.isLoggedIn ? this.setState({loggedIn: true}) : this.setState({loggedIn: false}))} */}
            {this.props.isLoggedIn ? (
              <div>
              <a className="nav__link" onClick={this.props.handleClick}>
                <i className="far fa-user" />
              </a>
              </div>
            ) : (
              <a className="nav__link toggle-sidemenu" onClick={this.logInClick}>
                <i className="fas fa-user" />
              </a>
            )}
            <span className="nav__separator">|</span>
            <a className="nav__link toggle-cart">
              <i className="fas fa-shopping-bag" />
              <div className="nav__counter">
                <span className="nav__counter__text">{this.props.cart}</span>
              </div>
            </a>
          </div>
        </div>
      </header>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.user.id,
    cart: state.cart.quantity,
    user: state.user.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  cart: PropTypes.number.isRequired
}

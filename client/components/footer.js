import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addEmailThunk} from '../store/newsletter'
import {NavLink} from 'react-router-dom'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    const email = event.target.email.value
    this.props.addEmailThunk(email)
    this.setState({email: ''})
  }
  render() {
    return (
      <div>
        <div className="footer">
          <div className="footer__container">
            <div className="footer__left">
              <h1 className="footer__title">Sign up for our newsletter</h1>
              <form onSubmit={this.handleSubmit}>
                <input
                  className="footer__input"
                  name="email"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.email}
                  placeholder="Email"
                />
                <button className="footer__button" type="submit">
                  Send
                </button>
              </form>
              <div className="footer__social">
                <i className="fab fa-instagram" />
                <i className="fab fa-facebook" />
                <i className="fab fa-twitter" />
              </div>
            </div>
            <div className="footer__middle">
              <h1 className="footer__title">Timeless Information</h1>
              <p className="footer__paragraph">
                Timeless watches was developed in 2019 by a team of dedicated watch enthusiasts. Join us on this journey through time. Get your Timeless watch today.
              </p>
            </div>
            <div className="footer__right">
              <h1 className="footer__title">Navigate</h1>
              <div className="footer__container">
                <nav className="footer__menu">
                  <NavLink
                    to="/home"
                    className="footer__link"
                    activeClassName="selected"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/products"
                    className="footer__link"
                    activeClassName="selected"
                  >
                    Watches
                  </NavLink>
                </nav>
                <nav className="footer__menu">
                  <a className="footer__link" href="#">
                    About Us
                  </a>
                  <a className="footer__link" href="#">
                    Our Team
                  </a>
                  <a className="footer__link" href="#">
                    FAQ
                  </a>
                  <a className="footer__link" href="#">
                    Jobs
                  </a>
                  <a className="footer__link" href="#">
                    Contact
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>
            <span className="footer__bottom__copyright">&copy;</span> Timeless Watch
            Company. All Rights Reserved.
          </p>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addEmailThunk: email => dispatch(addEmailThunk(email))
  }
}
export default connect(null, mapDispatch)(Footer)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {auth, login} from '../store'
import OauthLoginForm from './oauth-login-form'

class AuthForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'login',
      displayName: 'Login',
      error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    if (this.state.name === 'login') {
      this.setState({
        name: 'signup',
        displayName: 'Signup'
      })
    } else {
      this.setState({
        name: 'login',
        displayName: 'Login'
      })
    }
  }
  async handleSubmit(event) {
    try {
      event.preventDefault()
      const formName = event.target.name
      const email = event.target.email.value
      const password = event.target.password.value
      if (this.state.name === 'signup') {
        const firstName = event.target.firstName.value
        const lastName = event.target.lastName.value
        await this.props.auth(firstName, lastName, email, password, formName)
      } else {
        await this.props.login(email, password, formName)
      }
    } catch (error) {
      this.setState({
        error
      })
    }
  }
  render() {
    return (
      <div className="sidemenu">
        <div className="sidemenu__close">
          {this.state.name === 'signup' ? (
            <h1 className="sidemenu__title">Register</h1>
          ) : (
            <h1 className="sidemenu__title">Login</h1>
          )}
          <a className="close-sidemenu">
            <i className="far fa-times-circle" />
          </a>
        </div>
        {this.state.name === 'signup' ? (
          <p className="sidemenu__paragraph">
            Create a Timeless account to keep track of your orders and stay
            up-to-date on new additions.
          </p>
        ) : (
          <p className="sidemenu__paragraph">Log into your account below</p>
        )}
        <div className="login">
          <div className="login__container">
            <form
              name={this.state.name}
              className="signup-form"
              onSubmit={this.handleSubmit}
            >
              {this.state.name === 'signup' ? (
                <div>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    className="input"
                  />
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="input"
                  />
                  <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    className="input"
                  />
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input"
                  />
                </div>
              ) : (
                <div>
                  <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    className="input"
                  />
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input"
                  />
                </div>
              )}
              <button className="btn" type="submit">
                {this.state.displayName}
              </button>
              {this.props.error &&
                this.props.error.response && (
                  <h1> {this.props.error.response.data} </h1>
                )}
            </form>

            {this.state.name === 'signup' ? (
              <a className="login__link" onClick={() => this.handleClick()}>
                Already registered? <span>Log In Here!</span>
              </a>
            ) : (
              <a className="login__link" onClick={() => this.handleClick()}>
                Not signed up? <span>Register Here!</span>
              </a>
            )}
            <OauthLoginForm />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    error: state.user.user.error
  }
}
const mapDispatch = dispatch => {
  return {
    auth: (firstName, lastName, email, password, formName) =>
      dispatch(auth(firstName, lastName, email, password, formName)),
    login: (email, password, formName) =>
      dispatch(login(email, password, formName))
  }
}

export default connect(mapState, mapDispatch)(AuthForm)

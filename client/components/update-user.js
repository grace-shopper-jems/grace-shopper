import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateUserThunk} from '../store/user'

class UpdateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      streetAddressShip: '',
      cityShip: '',
      stateShip: '',
      zipShip: '',
      streetAddressBill: '',
      cityBill: '',
      stateBill: '',
      zipBill: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      phoneNumber: this.props.user.phoneNumber,
      streetAddressShip: this.props.user.streetAddressShip,
      cityShip: this.props.user.cityShip,
      stateShip: this.props.user.stateShip,
      zipShip: this.props.user.zipShip,
      streetAddressBill: this.props.user.streetAddressBill,
      cityBill: this.props.user.cityBill,
      stateBill: this.props.user.stateBill,
      zipBill: this.props.user.zipBill
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.props)
    alert('Changes submitted!')
    this.props.updateUser(this.props.user.id, this.state)
  }

  render() {
    return (
      <form className="updateUserForm" onSubmit={this.handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            onChange={this.handleChange}
            value={this.state.firstName}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={this.handleChange}
            value={this.state.lastName}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            onChange={this.handleChange}
            value={this.state.phoneNumber}
          />
        </div>
        <h2>Shipping Address</h2>
        <div>
          <label> Street Address</label>
          <input
            type="text"
            name="streetAddressShip"
            onChange={this.handleChange}
            value={this.state.streetAddressShip}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="cityShip"
            onChange={this.handleChange}
            value={this.state.cityShip}
          />
        </div>
        <div>
          <label>State</label>
          <input
            type="text"
            name="stateShip"
            onChange={this.handleChange}
            value={this.state.stateShip}
          />
        </div>
        <div>
          <label>Zip Code</label>
          <input
            type="text"
            name="zipShip"
            onChange={this.handleChange}
            value={this.state.zipShip}
          />
        </div>
        <h2>Billing Address</h2>
        <div>
          <label>Street Address</label>
          <input
            type="text"
            name="zipShip"
            onChange={this.handleChange}
            value={this.state.streetAddressBill}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="cityShip"
            onChange={this.handleChange}
            value={this.state.cityBill}
          />
        </div>
        <div>
          <label>State</label>
          <input
            type="text"
            name="stateShip"
            onChange={this.handleChange}
            value={this.state.stateBill}
          />
        </div>
        <div>
          <label>Zip Code</label>
          <input
            type="text"
            name="zipShip"
            onChange={this.handleChange}
            value={this.state.zipBill}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (id, user) => dispatch(updateUserThunk(id, user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser)

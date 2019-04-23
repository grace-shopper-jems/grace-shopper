// import React from 'react'
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
// import {auth, login} from '../store'
// import {Link} from 'react-router-dom'

// /**
//  * COMPONENT
//  */
// const AuthForm = props => {
//   console.log('AUTHFORM...', props)
//   const {name, displayName, handleSubmit, error} = props
//   return (
//     <div className="sidemenu">
//       <div className="sidemenu__close">
//         {name === 'signup' ? (
//           <h1 className="sidemenu__title">Register</h1>
//         ) : (
//           <h1 className="sidemenu__title">Login</h1>
//         )}
//         <a className="close-sidemenu">
//           <i className="far fa-times-circle" />
//         </a>
//       </div>
//       {name === 'signup' ? (
//         <p className="sidemenu__paragraph">
//           Create a JEMS account to keep track of your orders and stay up-to-date
//           on new additions.
//         </p>
//       ) : (
//         <p className="sidemenu__paragraph">Log into your account below</p>
//       )}
//       <div className="login">
//         <div className="login__container">
//           <form className="signup-form" onSubmit={handleSubmit} name={name}>
//             {name === 'signup' ? (
//               <div>
//                 <input type="text" placeholder="First Name" className="input" />
//                 <input type="text" placeholder="Last Name" className="input" />
//                 <input type="text" placeholder="Email" className="input" />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="input"
//                 />
//               </div>
//             ) : (
//               <div>
//                 <input type="text" placeholder="Email" className="input" />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="input"
//                 />
//               </div>
//             )}

//             <button className="btn" type="button">
//               {displayName}
//             </button>
//             {/* {error && error.response && <div> {error.response.data} </div>} */}
//           </form>
//           {name === 'signup' ? (
//             <a className="login__link">
//               Not signed up? <span>Register Here!</span>
//             </a>
//           ) : (
//             <a className="login__link">
//               Already registered? <span>Log In Here!</span>
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//     // <div className="login">
//     //   <div className="login__container">
//     //     <form onSubmit={handleSubmit} name={name} className="signup-form">
//     //       {name === 'signup' ? (
//     //         <div>
//     //           <input
//     //             name="firstName"
//     //             type="text"
//     //             placeholder="First Name"
//     //             className="input"
//     //           />
//     //           <input
//     //             name="lastName"
//     //             type="text"
//     //             placeholder="Last Name"
//     //             className="input"
//     //           />
//     //         </div>
//     //       ) : (
//     //         ''
//     //       )}
//     //       <input
//     //         name="email"
//     //         type="text"
//     //         placeholder="Email"
//     //         className="input"
//     //       />
//     //       <input
//     //         name="password"
//     //         type="password"
//     //         placeholder="Password"
//     //         className="input"
//     //       />
//     //       <button type="submit" className="btn">
//     //         {displayName}
//     //       </button>
//     //     </form>
//     //   </div>
//     // </div>

//     //old
//     // <div>
//     //   <form onSubmit={handleSubmit} name={name}>
//     //     {name === 'signup' ? (
//     //       <div>
//     //         <div>
//     //           <label htmlFor="firstName">
//     //             <small>First Name</small>
//     //           </label>
//     //           <input name="firstName" type="text" />
//     //         </div>
//     //         <div>
//     //           <label htmlFor="lastName">
//     //             <small>Last Name</small>
//     //           </label>
//     //           <input name="lastName" type="text" />
//     //         </div>
//     //       </div>
//     //     ) : (
//     //       ''
//     //     )}
//     //     <div>
//     //       <label htmlFor="email">
//     //         <small>Email</small>
//     //       </label>
//     //       <input name="email" type="text" />
//     //     </div>
//     //     <div>
//     //       <label htmlFor="password">
//     //         <small>Password</small>
//     //       </label>
//     //       <input name="password" type="password" />
//     //     </div>
//     //     <div>
//     //       <button type="submit">{displayName}</button>
//     //     </div>
//     //     {error && error.response && <div> {error.response.data} </div>}
//     //   </form>
//     //   <a href="/auth/google">{displayName} with Google</a>
//     // </div>
//   )
// }

// /**
//  * CONTAINER
//  *   Note that we have two different sets of 'mapStateToProps' functions -
//  *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
//  *   function, and share the same Component. This is a good example of how we
//  *   can stay DRY with interfaces that are very similar to each other!
//  */
// const mapLogin = state => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.user.error
//   }
// }

// const mapSignup = state => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.user.error
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const email = evt.target.email.value
//       const password = evt.target.password.value
//       if (formName === 'signup') {
//         const firstName = evt.target.firstName.value
//         const lastName = evt.target.lastName.value
//         dispatch(auth(firstName, lastName, email, password, formName))
//       } else {
//         dispatch(login(email, password, formName))
//       }
//     }
//   }
// }

// export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

// /**
//  * PROP TYPES
//  */
// AuthForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object
// }

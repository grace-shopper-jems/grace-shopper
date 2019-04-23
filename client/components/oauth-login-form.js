import React from 'react'

const OauthLoginForm = props => {
  return (
    <form className="oauth" method="get" action="/auth/google">
      <button type="submit" className="btn bg-red white p1 rounded">
        Login with Google
      </button>
    </form>
  )
}

export default OauthLoginForm

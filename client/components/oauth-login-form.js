import React from 'react'

const OauthLoginForm = props => {
  return (
    <form className="oauth" method="get" action="/auth/google">
      <button type="submit" className="bg-red white p1 rounded" />
    </form>
  )
}

export default OauthLoginForm

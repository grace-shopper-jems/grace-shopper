import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Footer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="footer">
        <div className="footer__sections">
          <div className="footer__left">
            <h1 className="footer__title">JEMS NEWSLETTER</h1>
            <h2 className="footer__subtitle">Subscribe to our newsletter</h2>
          </div>
          <div className="footer__middle">middle</div>
          <div className="footer__right">right</div>
        </div>
        <div className="footer__bottom">
          JEMS Watch Company - 5 Hanover Square, New York, NY 10004
        </div>
      </div>
    )
  }
}

export default Footer

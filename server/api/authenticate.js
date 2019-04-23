const {User} = require('../db/models/')

const isAuthenticated = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.session.passport.user)
    if (user.dataValues.isAdmin) {
      return next()
    } else {
      res.redirect('/home');
    }
  } catch (e) {
    res.redirect('/home');
  }
}

module.exports = isAuthenticated

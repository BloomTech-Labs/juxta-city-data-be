require('dotenv').config()

module.exports = {
  google: {
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET
  },
  github: {
      clientID: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET
  },
  session: {
      cookieKey: process.env.SESSION_COOKIE_KEY
  },
  jwtSecret: process.env.JWT_SECRET
}
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = (req, res, next) => {

  // console.log(req.headers.authorization, "req.headers.authorization.")
  const token = req.headers.authorization;
  //const token = req.headers.authorization.split(' ')[1]; // uncomment this line to test the endpoints in postmen

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {

        res.status(401).json({ message: 'Not authorized to enter' });

      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Not authorized token not present' });
  }
};

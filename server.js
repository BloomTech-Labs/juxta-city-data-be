require('dotenv').config()

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport')
const passportSetup = require('./config/passport-setup.js')
const keys = require('./config/secrets.js')

const errorHandler = require('./middleware/errorHandler');
const authenticationRouter = require('./auth/authentication-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));
server.use(passport.initialize())

server.get('/', (req, res) => {
  res.send('Hello City');
});

server.use('/api/auth', authenticationRouter);

server.use(errorHandler);

// 404 Handler
server.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

module.exports = server;

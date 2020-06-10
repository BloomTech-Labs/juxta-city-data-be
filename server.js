const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const errorHandler = require('./middleware/errorHandler');
const authenticator = require('./middleware/authentication.js');
const usersRouter = require('./routers/users-router.js');
const authRouter = require('./routers/authentication-router.js');
const profileRouter = require('./routers/profile-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.send('Hello City');
});

server.use('/api/users', authenticator, usersRouter);
server.use('/api/auth', authRouter);
server.use('/api/profile', authenticator, profileRouter);

server.use(errorHandler);

module.exports = server;

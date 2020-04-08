const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const errorHandler = require('./middleware/errorHandler');
const usersRouter = require('./routers/users-router.js');
const { oidcSession, oidc } = require('./middleware/oidc-router.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));
server.use(oidcSession)
server.use(oidc.router)


server.get('/', (req, res) => {
  res.send('Hello City');
});

server.use('/api/users', usersRouter);

server.use(errorHandler);

// 404 Handler
server.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

module.exports = server;

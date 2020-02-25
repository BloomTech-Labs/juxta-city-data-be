const express = require('express');

const usersRouter = require('./routers/users-router.js');

const server = express();

server.get('/', (req, res) => {
  res.send('Hello City');
});

server.use('/api/users', usersRouter);

module.exports = server;

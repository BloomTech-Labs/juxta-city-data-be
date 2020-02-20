const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send('Hello City');
});

module.exports = server;

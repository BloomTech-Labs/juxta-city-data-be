const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const errorHandler = require('./middleware/errorHandler');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.send('Hello City');
});

server.use(errorHandler);

// 404 Handler
server.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

module.exports = server;

require('dotenv').config();

const server = require('./server');

const PORT = process.env.PORT || 7500;

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

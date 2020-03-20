require('dotenv').config()

const server = require("./api/server.js");

const PORT = process.env.PORT || 6000;

server.listen(PORT, function() {
  console.log(`\n *** Service is running on localhost:${PORT} *** \n`);
});

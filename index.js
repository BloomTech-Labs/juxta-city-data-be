if (process.env.ENV !== 'production') {
  require('dotenv').config()
}
console.log('env', process.env.DB_NAME)
const server = require('./server');

const PORT = process.env.PORT || 7500;

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

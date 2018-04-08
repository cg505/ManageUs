const http = require('http');
const app = require('./server/app');

const port = 4000;
app.set('port', 4000);

const server = http.createServer(app);
server.listen(4000, () => {
  console.log(`The backend server has started at localhost:${port}`);
});

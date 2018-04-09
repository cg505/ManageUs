const http = require('http');
const Express = require('express');
require('dotenv').config();
const api = require('./server/app');

const app = Express();

app.use('/api', api);

if(process.env.NODE_ENV == 'production') {
  const fs = require('fs');
  const staticLog = fs.createWriteStream('static.log', {
    flags: 'a'
  });

  const Morgan = require('morgan');
  app.use(Morgan('combined', {
    stream: staticLog
  }));

  // serve js/css/etc
  app.use(Express.static('build'));

  // serve index.html for anything we haven't covered yet
  // shouldn't hit this within /api/*
  app.get('/*', (req, res) =>
    res.sendFile('index.html', {
      root: './build'
    })
  );
}

const port = process.env.EXPRESS_PORT || 4000;

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`The backend server has started at localhost:${port}`);
});

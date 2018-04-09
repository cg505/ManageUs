const Express = require('express');
const Morgan = require('morgan');
const BodyParser = require('body-parser');
const Session = require('express-session');

const app = Express();

app.use(Morgan('dev'));
app.use(BodyParser.json());
app.use(Session({
  secret: 'turkstra is bae',
  resave: false,
  saveUninitialized: false
}))

require('./routes')(app);

module.exports = app;

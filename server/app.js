const Express = require('express');
const Morgan = require('morgan');
const BodyParser = require('body-parser');

const app = Express();

app.use(Morgan('dev'));

app.use(BodyParser.json());

app.get('*', (req, res) => res.status(200).send({
  message: 'hi there'
}));

module.exports = app;

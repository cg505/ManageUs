const Controllers = require('./controllers');

module.exports = (app) => {
  app.get('/', (req, res) =>
    res.status(200).send({
      message: "hello world from the api!"
    })
  );

  app.get('/users', Controllers.users.current);
  app.get('/users/:id', Controllers.users.get);
  app.post('/users', Controllers.users.create);

  app.post('/sessions/login', Controllers.sessions.login);
  app.post('/sessions/logout', Controllers.sessions.logout);

  // fallthrough
  app.get('/*', (req, res) =>
    res.status(404).send({
      error: 'endpoint not found'
    })
  );
};

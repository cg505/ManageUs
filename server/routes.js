const Controllers = require('./controllers');

module.exports = (app) => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: "hello world from the api!"
    })
  );

  app.get('/api/users', Controllers.users.current);
  app.get('/api/users/:id', Controllers.users.get);
  app.post('/api/users', Controllers.users.create);

  app.post('/api/sessions/login', Controllers.sessions.login);
  app.post('/api/sessions/logout', Controllers.sessions.logout);
};

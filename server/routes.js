const Controllers = require('./controllers');

module.exports = (app) => {
    app.get('/', (req, res) =>
        res.status(200).send({
            message: "hello world from the api!"
        })
    );

    app.get('/users', Controllers.users.current);
    //app.get('/users/:id', Controllers.users.get);
    app.post('/users', Controllers.users.create);

    app.post('/sessions/login', Controllers.sessions.login);
    app.post('/sessions/logout', Controllers.sessions.logout);

    app.get('/households', Controllers.households.get);
    app.get('/households/keys', Controllers.households.keys);
    app.post('/households', Controllers.households.create);
    app.post('/households/generateKey', Controllers.households.generateKey);
    app.post('/households/join', Controllers.households.join);
    app.post('/households/leave', Controllers.households.leave);

    app.get('/households/notes', Controllers.notes.index);
    app.post('/households/notes', Controllers.notes.create);
    app.post('/households/notes/:noteId', Controllers.notes.update);

    // fallthrough
    app.get('/*', (req, res) =>
        res.status(404).send({
            error: 'endpoint not found'
        })
    );
};

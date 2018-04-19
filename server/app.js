const Express = require('express');
const Morgan = require('morgan');
const Session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(Session.Store);

const app = Express();

if(process.env.NODE_ENV == 'production') {
    const fs = require('fs');
    const apiLog = fs.createWriteStream('api.log', {
        flags: 'a'
    });

    app.use(Morgan('combined', {
        stream: apiLog
    }));
} else {
    app.use(Morgan('dev'));
}

app.use(Express.json());

const store = new SequelizeStore({
    db: require('./models').sequelize
});
// create session table if it does not exist
// we don't really care if this loses data since
// sessions are ephemeral
store.sync();

app.use(Session({
    secret: 'turkstra is bae',
    resave: false,
    saveUninitialized: false,
    store
}))

require('./routes')(app);

module.exports = app;

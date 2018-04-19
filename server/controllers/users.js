const bcrypt = require('bcrypt');
const Models = require('../models');

module.exports = {
    async current(req, res) {
        if(!req.session.userId) {
            return res.status(401).send('please log in');
        }
        try {
            const user = await Models.User.findById(req.session.userId, {
                attributes: ['firstName', 'lastName', 'email']
            });

            if(user) {
                return res.status(200).send(user);
            } else {
                return res.status(404).send();
            }
        } catch(error) {
            res.status(500).send(error)
        }
    },

    async get(req, res) {
        try {
            const user = await Models.User.findById(req.params.id);

            if(user) {
                return res.status(200).send(user);
            } else {
                return res.status(404).send();
            }
        } catch(error) {
            return res.status(500).send(error);
        }
    },

    async create(req, res) {
        if(!req.body.password) {
            return res.status(400).send({
                error: "Please include password"
            })
        }

        let passwordHash;
        try {
            passwordHash = await bcrypt.hash(req.body.password, 10);
        } catch(error) {
            console.log(error);
            return res.status(500).send(error);
        }
        try {
            const user = await Models.User.create({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                passwordHash
            });
            res.status(201).send({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            });
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

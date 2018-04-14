const bcrypt = require('bcrypt');
const Models = require('../models');

module.exports = {
    async current(req, res) {
        if(!req.session.userId) {
            return res.status(401).send('please log in');
        }
        try {
            const user = await Models.User.findById(req.session.userId, {
                attributes: ['name', 'email']
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
                name: req.body.name,
                passwordHash
            });
            res.status(201).send({
                name: user.name,
                email: user.email
            });
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

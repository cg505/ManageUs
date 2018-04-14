const Crypto = require('crypto');
const Models = require('../models');

module.exports = {
    async generateKey(req, res) {
        if(!req.session.userId) {
            return res.status(401).send();
        }

        const user = await Models.User.findById(req.session.userId, {
            attributes: [],
            include: [Models.Household]
        });

        if(!user) {
            return res.status(500).send();
        }

        if(!user.Household) {
            return res.status(400).send({
                error: 'Not in a household'
            })
        }

        // maybe we ought to invalidate any current keys?
        // for now don't do that

        const expires = new Date();
        // expires in 2 days
        expires.setDate(expires.getDate() + 2);

        // generate join key
        const base = Crypto.randomBytes(256);
        const hash = Crypto.createHash('sha256');
        hash.update(base);
        const key = hash.digest('base64');

        try {
            const obj = {
                key,
                expires,
                householdId: user.Household.id,
            };
            console.log(obj);
            const joinKey = await Models.JoinKey.create(obj);
            res.status(200).send(joinKey);
        } catch (error) {
            res.status(500).send({
                error,
                message: error.message
            });
        }
    },

    async join(req, res) {
        if(!req.session.userId) {
            return res.status(401).send();
        }

        const user = await Models.User.findById(req.session.userId, {
            attributes: ['id'],
            include: [Models.Household]
        });

        if(!user) {
            return res.status(500).send();
        }

        if(user.Household) {
            return res.status(400).send({
                error: 'Already in a household'
            })
        }

        const joinKey = await Models.JoinKey.findOne({
            where: {key: req.body.key},
        });

        if(!joinKey) {
            return res.status(400).send({
                error: 'Invalid join key'
            });
        }

        if(joinKey.expires < new Date()) {
            // expired key, delete it
            res.status(400).send({
                error: 'Key expired'
            });
            joinKey.destroy();
            return;
        }

        // everything looks good, proceed
        try {
            await user.update({
                householdId: joinKey.householdId
            });
            return res.status(200).send({
                householdId: joinKey.householdId
            });
        } catch (error) {
            res.status(500).send(error);
            throw error;
        }
    },

    async get(req, res) {
        if(!req.session.userId) {
            return res.status(401).send();
        }

        const user = await Models.User.findById(req.session.userId, {
            attributes: [],
            include: [{
                model: Models.Household,
                include: [{
                    attributes: ['name', 'email'],
                    model: Models.User
                }]
            }]
        });

        if(!user) {
            return res.status(500).send();
        }

        if(!user.Household) {
            return res.status(400).send({
                error: 'Not in a household'
            })
        }

        return res.status(200).send(user.Household);
    },

    async keys(req, res) {
        if(!req.session.userId) {
            return res.status(401).send();
        }

        const user = await Models.User.findById(req.session.userId, {
            attributes: [],
            include: [{
                model: Models.Household,
                attributes: ['id'],
                include: [{
                    attributes: ['key', 'expires'],
                    model: Models.JoinKey
                }]
            }]
        });

        if(!user) {
            return res.status(500).send();
        }

        if(!user.Household) {
            return res.status(400).send({
                error: 'Not in a household'
            })
        }

        return res.status(200).send(user.Household.JoinKeys);
    },

    async create(req, res) {
        if(!req.session.userId) {
            return res.status(401).send();
        }

        const user = await Models.User.findById(req.session.userId, {
            attributes: ['id'],
            include: [Models.Household]
        });

        if(!user) {
            return res.status(500).send();
        }

        if(user.Household) {
            return res.status(400).send({
                error: 'Already in a household'
            })
        }

        try {
            const household = await Models.Household.create({
                name: req.body.name
            });
            await user.setHousehold(household);
            return res.status(200).send(household);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

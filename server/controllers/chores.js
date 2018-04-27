const Models = require('../models');

module.exports = {
    async index(req, res) {
        if(!req.session.userId) {
            return res.status(401).send();
        }

        let user;
        try {
            user = await Models.User.findById(req.session.userId, {
                attributes: ['id'],
                include: {
                    model: Models.Household,
                    attributes: ['id'],
                    include: {
                        model: Models.ChoreItem,
                        include: [{
                            model: Models.User,
                            as: 'assign',
                            attributes: ['id', 'firstName', 'lastName']
                        }]
                    }
                }
            });
        } catch(error) {
            res.status(500).send(error);
            throw error;
        }

        if(!user) {
            return res.status(500).send();
        }

        if(!user.Household) {
            return res.status(400).send({
                error: 'Not in a household'
            })
        }

        return res.status(200).send(user.Household.ChoreItems);
    },

    async create(req, res) {
        if(!req.session.userId) {
            return res.status(401).send();
        }

        const user = await Models.User.findById(req.session.userId, {
            attributes: ['id'],
            include: {
                model: Models.Household,
                attributes: ['id'],
            }
        });

        if(!user) {
            return res.status(500).send();
        }

        if(!user.Household) {
            return res.status(400).send({
                error: 'Not in a household'
            })
        }

        let assignId;
        if(typeof req.body.assign === 'undefined') {
            return res.status(400).send('gimme assign');
        } else {
            const assign = (await Models.User.findOne({
                where: {email: req.body.assign, householdId: user.Household.id},
                attributes: ['id']
            }));
            if(!assign) {
                return res.status(400).send('no such user');
            }
            assignId = assign.id;
        }

        try {
            const choreItem = await Models.ChoreItem.create({
                name: req.body.name,
                checked: false,
                assignId,
                householdId: user.Household.id
            });
            return res.status(200).send(await Models.ChoreItem.findById(choreItem.id, {
                include: [{
                    model: Models.User,
                    as: 'assign',
                    attributes: ['firstName', 'lastName', 'id']
                }]
            }));
        } catch (error) {
            // assume it's your fault
            return res.status(400).send(error);
        }
    },

    async update(req, res) {
        if(!req.session.userId) {
            return res.status(401).send();
        }

        const user = await Models.User.findById(req.session.userId, {
            attributes: ['id'],
            include: {
                model: Models.Household,
                attributes: ['id'],
            }
        });

        if(!user) {
            return res.status(500).send();
        }

        if(!user.Household) {
            return res.status(400).send({
                error: 'Not in a household'
            })
        }

        const choreItem = await Models.ChoreItem.findById(req.params.choreId);

        if(!choreItem || choreItem.householdId != user.Household.id) {
            return res.status(404).send({
                error: 'ChoreItem does not exist or belongs to another household'
            })
        }

        if(typeof req.body.name !== 'undefined') {
            choreItem.name = req.body.name;
        }
        if(typeof req.body.checked !== 'undefined') {
            choreItem.checked = req.body.checked;
        }

        try {
            await choreItem.save();
            return res.status(200).send(choreItem);
        } catch (error) {
            // assume it's your fault
            return res.status(400).send(error);
        }
    }
}

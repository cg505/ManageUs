const Models = require('../models');

module.exports = {
    async get(req, res) {
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
                        model: Models.Rules,
                        as: 'rules',
                        include: [{
                            model: Models.User,
                            as: 'lastEditor',
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

        return res.status(200).send(user.Household.rules || 'null');
    },

    async update(req, res) {
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
                        model: Models.Rules,
                        as: 'rules',
                        include: [{
                            model: Models.User,
                            as: 'lastEditor',
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

        if(user.Household.rules) {
            // we already have created rules
            const rules = user.Household.rules;

            rules.text = req.body.text;
            rules.lastEditorId = user.id;

            try {
                await rules.save();
                return res.status(200).send(await rules.reload());
            } catch (error) {
                // assume it's your fault
                throw error;
                return res.status(400).send(error);
            }
        } else {
            try {
                const rules = await Models.Rules.create({
                    text: req.body.text,
                    householdId: user.Household.id,
                    lastEditorId: user.id
                });
                await rules.reload({
                    include: {
                        model: Models.User,
                        as: 'lastEditor',
                        attributes: ['id', 'firstName', 'lastName']
                    }
                })
                return res.status(200).send(rules);
            } catch (error) {
                // assume it's your fault still
                return res.status(400).send(error);
            }
        }
    }
}

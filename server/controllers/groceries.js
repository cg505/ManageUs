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
                        model: Models.GroceryItem,
                        include: [{
                            model: Models.User,
                            as: 'creator',
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

        return res.status(200).send(user.Household.GroceryItems);
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

        try {
            const groceryItem = await Models.GroceryItem.create({
                // TODO: color translation
                // color: ???,
                name: req.body.name,
                checked: false,
                creatorId: user.id,
                householdId: user.Household.id
            });
            return res.status(200).send(groceryItem);
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

        const groceryItem = await Models.GroceryItem.findById(req.params.groceryId);

        if(!groceryItem || groceryItem.householdId != user.Household.id) {
            return res.status(404).send({
                error: 'GroceryItem does not exist or belongs to another household'
            })
        }

        if(req.body.name) {
            groceryItem.name = req.body.name;
        }
        if(req.body.checked) {
            groceryItem.checked = req.body.checked;
        }

        try {
            await groceryItem.save();
            return res.status(200).send(groceryItem);
        } catch (error) {
            // assume it's your fault
            return res.status(400).send(error);
        }
    }
}

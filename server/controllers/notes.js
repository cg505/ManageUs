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
                        model: Models.Note,
                        attributes: ['id', 'color', 'text'],
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

        if(!user.Household) {
            return res.status(400).send({
                error: 'Not in a household'
            })
        }

        const notes = user.Household.Notes.map(note => Object.assign({}, note.get(), {
            //color: transformColor(note.color)
        }));

        if(!user) {
            return res.status(500).send();
        }

        return res.status(200).send(notes);
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
            const note = await Models.Note.create({
                // TODO: color translation
                // color: ???,
                text: req.body.text,
                creatorId: user.id,
                householdId: user.Household.id
            });
            return res.status(200).send(note);
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

        const note = await Models.Note.findById(req.params.noteId);

        if(!note || note.householdId != user.Household.id) {
            return res.status(404).send({
                error: 'Note does not exist or belongs to another household'
            })
        }

        if(req.body.text) {
           note.text = req.body.text;
        }
        if(req.body.color) {
            // figure out translation
        }

        try {
            await note.save();
            return res.status(200).send(note);
        } catch (error) {
            // assume it's your fault
            return res.status(400).send(error);
        }
    }
}

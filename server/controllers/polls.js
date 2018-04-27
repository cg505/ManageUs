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
                include: [{
                    model: Models.Household,
                    attributes: ['id'],
                    include: [{
                        model: Models.Poll,
                        attributes: ['id', 'question', 'choiceA', 'choiceB', 'choiceC', 'choiceD'],
                        include: [{
                            model: Models.User,
                            as: 'creator',
                            attributes: ['id', 'firstName', 'lastName']
                        }, {
                            model: Models.Vote,
                            include: [{
                                model: Models.User,
                                attributes: ['id', 'firstName', 'lastName']
                            }]
                        }]
                    }]
                }]
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

        const notes = user.Household.Polls.map(poll => Object.assign({}, poll.get(), {
            countA: poll.Votes.filter((vote) => (vote.choice === 0)).length,
            countB: poll.Votes.filter((vote) => (vote.choice === 1)).length,
            countC: poll.Votes.filter((vote) => (vote.choice === 2)).length,
            countD: poll.Votes.filter((vote) => (vote.choice === 3)).length
        }));

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
            const note = await Models.Poll.create({
                question: req.body.question,
                choiceA: req.body.choiceA,
                choiceB: req.body.choiceB,
                choiceC: req.body.choiceC,
                choiceD: req.body.choiceD,
                creatorId: user.id,
                householdId: user.Household.id
            });
            return res.status(200).send(note);
        } catch (error) {
            // assume it's your fault
            return res.status(400).send(error);
        }
    },

    async vote(req, res) {
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

        const poll = await Models.Poll.findById(req.params.pollId);

        if(!poll || poll.householdId != user.Household.id) {
            return res.status(404).send({
                error: 'Poll does not exist or belongs to another household'
            })
        }

        // delete old vote
        await Models.Vote.destroy({
            where: {
                pollId: poll.id,
                userId: user.id
            }
        });


        try {
            const vote = {
                choice: {
                    A: 0,
                    B: 1,
                    C: 2,
                    D: 3
                }[req.body.choice],
                userId: user.id,
                pollId: poll.id
            };
            await Models.Vote.create(vote);
            return res.status(200).send(vote);
        } catch (error) {
            // assume it's your fault
            throw error;
            return res.status(400).send(error);
        }
    }
}

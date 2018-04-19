const bcrypt = require('bcrypt');
const Models = require('../models');

module.exports = {
    async login(req, res) {
        const user = await Models.User.findOne({
            where: {email: req.body.email},
            attributes: ['passwordHash', 'id']
        });

        if(!user) {
            return res.status(401).send({
                error: "User not found"
            });
        }

        if(await bcrypt.compare(req.body.password, user.passwordHash)) {
            req.session.userId = user.id;
            return res.status(200).send(user);
        }

        return res.status(401).send({
            error: "Password does not match"
        });
    },

    async logout(req, res) {
        await req.session.destroy();
        return res.status(204).send();
    }
}

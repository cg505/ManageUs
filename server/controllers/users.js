const Models = require('../models');

module.exports = {
  async current(req, res) {
    try {
      const user = await Models.User.findById(1);

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
      return res.status(404).send(error);
    }
  },

  async create(req, res) {
    try {
      const user = await Models.User.create({
        email: req.body.email,
        name: req.body.name
      });
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

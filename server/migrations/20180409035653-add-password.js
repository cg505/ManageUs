module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Users', 'passwordHash', Sequelize.CHAR(60)),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('Users', 'passwordHash')
};

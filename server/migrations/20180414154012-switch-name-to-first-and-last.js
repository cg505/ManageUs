module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.removeColumn('Users', 'name');
        queryInterface.addColumn('Users', 'firstName', Sequelize.STRING);
        queryInterface.addColumn('Users', 'lastName', Sequelize.STRING);
    },
    down: (queryInterface, Sequelize) => {
        queryInterface.removeColumn('Users', 'firstName');
        queryInterface.removeColumn('Users', 'lastName');
        queryInterface.addColumn('Users', 'name', Sequelize.STRING);
    }
};

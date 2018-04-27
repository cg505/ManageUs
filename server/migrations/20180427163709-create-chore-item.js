module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('ChoreItems', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            householdId: {
                references: {
                    model: 'Households'
                },
                allowNull: false,
                type: Sequelize.INTEGER
            },
            assignId: {
                references: {
                    model: 'Users'
                },
                type: Sequelize.INTEGER
            },
            checked: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }),
    down: (queryInterface, Sequelize) =>
        queryInterface.dropTable('GroceryItems')
};

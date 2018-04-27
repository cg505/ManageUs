module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Rules', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            text: {
                type: Sequelize.TEXT
            },
            householdId: {
                references: {
                    model: 'Households'
                },
                allowNull: false,
                type: Sequelize.INTEGER
            },
            lastEditorId: {
                references: {
                    model: 'Users'
                },
                type: Sequelize.INTEGER
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
        queryInterface.dropTable('Rules')
};

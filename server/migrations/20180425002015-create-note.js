module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Notes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            color: {
                type: Sequelize.INTEGER
            },
            text: {
                type: Sequelize.TEXT
            },
            creatorId: {
                references: {
                    model: 'Users'
                },
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            householdId: {
                references: {
                    model: 'Households'
                },
                onDelete: 'CASCADE',
                allowNull: false,
                type: Sequelize.INTEGER,
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
        queryInterface.dropTable('Notes')
};

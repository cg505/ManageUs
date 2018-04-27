module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Votes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            pollId: {
                references: {
                    model: 'Polls',
                },
                onDelete: 'cascade',
                allowNull: false,
                type: Sequelize.INTEGER
            },
            userId: {
                references: {
                    model: 'Users',
                },
                onDelete: 'cascade',
                allowNull: false,
                type: Sequelize.INTEGER
            },
            choice: {
                allowNull: false,
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
        queryInterface.dropTable('Votes')
};

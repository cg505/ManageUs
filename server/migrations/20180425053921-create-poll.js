module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Polls', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            question: {
                type: Sequelize.TEXT
            },
            choiceA: {
                type: Sequelize.STRING
            },
            choiceB: {
                type: Sequelize.STRING
            },
            choiceC: {
                type: Sequelize.STRING
            },
            choiceD: {
                type: Sequelize.STRING
            },
            householdId: {
                references: {
                    model: 'Households'
                },
                allowNull: false,
                type: Sequelize.INTEGER
            },
            creatorId: {
                references: {
                    model: 'Users'
                },
                type: Sequelize.INTEGER
            },
            rules: {
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
        queryInterface.dropTable('Polls')
};

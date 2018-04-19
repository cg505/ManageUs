module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('JoinKeys', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        key: {
            unique: true,
            charset: 'utf8',
            allowNull: false,
            type: Sequelize.STRING
        },
        expires: {
            allowNull: false,
            type: Sequelize.DATE
        },
        householdId: {
            references: {
                model: 'Households'
            },
            onDelete: 'CASCADE',
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
    }) ,
    down: (queryInterface, Sequelize) => queryInterface.dropTable('JoinKeys')
};

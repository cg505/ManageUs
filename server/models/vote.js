module.exports = (sequelize, DataTypes) => {
    const Vote = sequelize.define('Vote', {
        pollId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        choice: DataTypes.INTEGER
    }, {
        /*scopes: ['A', 'B', 'C', 'D'].reduce((acc, choice, index) =>
         *    Object.assign(acc, {
         *        [choice]: {
         *            where: {
         *                choice: index
         *            }
         *        }
         *    }), {})*/
    });

    Vote.associate = (models) => {
        Vote.belongsTo(models.Poll, {
            foreignKey: 'pollId',
        });
        Vote.belongsTo(models.User, {
            foreignKey: 'userId',
        });
    };

    return Vote;
};

module.exports = (sequelize, DataTypes) => {
    const Poll = sequelize.define('Poll', {
        question: DataTypes.TEXT,
        choiceA: DataTypes.STRING,
        choiceB: DataTypes.STRING,
        choiceC: DataTypes.STRING,
        choiceD: DataTypes.STRING,
        householdId: DataTypes.INTEGER,
        creatorId: DataTypes.INTEGER,
        rules: DataTypes.BOOLEAN
    }, {});

    Poll.associate = (models) => {
        Poll.belongsTo(models.User, {
            as: 'creator',
            foreignKey: 'creatorId'
        });
        Poll.hasMany(models.Vote, {
            foreignKey: 'pollId'
        });
        /*['A', 'B', 'C', 'D'].forEach((choice) =>
         *    Poll.belongsToMany(models.User, {
         *        as: `${choice}votes`,
         *        through: {
         *            model: models.Vote,
         *            scope: choice
         *        },
         *        foreignKey: 'pollId',
         *        otherKey: 'userId',
         *    })
         *);*/
    };

    return Poll;
};

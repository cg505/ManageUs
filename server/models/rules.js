module.exports = (sequelize, DataTypes) => {
    const Rules = sequelize.define('Rules', {
        text: DataTypes.TEXT,
        householdId: DataTypes.INTEGER,
        lastEditorId: DataTypes.INTEGER
    }, {});

    Rules.associate = (models) => {
        Rules.belongsTo(models.Household, {
            foreignKey: 'householdId'
        });
        Rules.belongsTo(models.User, {
            as: 'lastEditor',
            foreignKey: 'lastEditorId'
        });
    };

    return Rules;
};

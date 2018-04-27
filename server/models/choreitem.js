module.exports = (sequelize, DataTypes) => {
    const ChoreItem = sequelize.define('ChoreItem', {
        name: DataTypes.STRING,
        householdId: DataTypes.INTEGER,
        assignId: DataTypes.INTEGER,
        checked: DataTypes.BOOLEAN
    }, {});

    ChoreItem.associate = (models) => {
        ChoreItem.belongsTo(models.Household, {
            foreignKey: 'householdId'
        });

        ChoreItem.belongsTo(models.User, {
            as: 'assign',
            foreignKey: 'assignId'
        });
    };

    return ChoreItem;
};

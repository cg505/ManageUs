module.exports = (sequelize, DataTypes) => {
    const GroceryItem = sequelize.define('GroceryItem', {
        name: DataTypes.STRING,
        householdId: DataTypes.INTEGER,
        creatorId: DataTypes.INTEGER,
        checked: DataTypes.BOOLEAN
    }, {});

    GroceryItem.associate = (models) => {
        GroceryItem.belongsTo(models.Household, {
            foreignKey: 'householdId'
        });

        GroceryItem.belongsTo(models.User, {
            foreignKey: 'creatorId'
        });
    };

    return GroceryItem;
};

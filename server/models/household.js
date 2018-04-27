module.exports = (sequelize, DataTypes) => {
    const Household = sequelize.define('Household', {
        name: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {});

    Household.associate = (models) => {
        const hasManyModels = [
            models.User,
            models.JoinKey,
            models.Note,
            models.GroceryItem,
            models.Poll,
            models.ChoreItem
        ];

        hasManyModels.forEach((model) =>
            Household.hasMany(model, {
                foreignKey: 'householdId'
            })
        );

        Household.hasOne(models.Rules, {
            foreignKey: 'householdId',
            as: 'rules'
        });
    };

    return Household;
};

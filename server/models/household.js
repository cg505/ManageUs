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
            models.Note
        ];

        hasManyModels.forEach((model) =>
            Household.hasMany(model, {
                foreignKey: 'householdId'
            })
        );
    };

    return Household;
};

module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('Note', {
        color: DataTypes.INTEGER,
        text: DataTypes.TEXT,
        creatorId: DataTypes.INTEGER
    }, {});

    Note.associate = (models) => {
        Note.belongsTo(models.Household, {
            foreignKey: 'householdId'
        });
        Note.belongsTo(models.Household, {
            as: 'creator',
            foreignKey: 'creatorId'
        });
    };

    return Note;
};

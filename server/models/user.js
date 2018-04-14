module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    name: DataTypes.STRING,
    passwordHash: DataTypes.CHAR(60),
    householdId: DataTypes.INTEGER
  }, {});

  User.associate = (models) => {
    User.belongsTo(models.Household, {
      foreignKey: 'householdId'
    });
  };

  return User;
};

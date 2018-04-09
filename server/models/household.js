module.exports = (sequelize, DataTypes) => {
  const Household = sequelize.define('Household', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});

  Household.associate = (models) => {
    Household.hasMany(models.User);
  };

  return Household;
};

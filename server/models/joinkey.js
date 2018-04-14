module.exports = (sequelize, DataTypes) => {
  const JoinKey = sequelize.define('JoinKey', {
    key: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    expires: {
      allowNull: false,
      type: DataTypes.DATE
    },
    householdId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});

  JoinKey.associate = (models) => {
    JoinKey.belongsTo(models.Household, {
      foreignKey: 'householdId'
    });
  };

  return JoinKey;
};

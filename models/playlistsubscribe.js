'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistSubscribe extends Model {
    static associate(models) {
      // define association here
      PlaylistSubscribe.belongsToMany(models.User, {
        through: models.Subscribe,
        foreignKey: 'PlaylistSubscribeId'
      })
      PlaylistSubscribe.belongsTo(models.Playlist, {foreignKey: 'PlaylistId', targetKey: 'id'})
    }
  };
  PlaylistSubscribe.init({
    PlaylistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlaylistSubscribe',
  });
  return PlaylistSubscribe;
};
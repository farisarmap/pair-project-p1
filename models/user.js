'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Playlist)
      User.belongsToMany(models.PlaylistSubscribe, {
        through: models.Subscribe,
        foreignKey: 'PlaylistSubscribeId'
      })
    }
  };
  User.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(instance.password, salt);
    instance.password = hash
  });
  User.beforeCreate((instance, options)=>{
    if(!instance.age){
      instance.age = 0
    }
  })
  User.beforeUpdate((instance, options)=>{
    if(!instance.age){
      instance.age = 0
    }
  });
  return User;
};
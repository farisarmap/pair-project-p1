'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const Song = require('../song.json');
    Song.forEach(el => {
      delete el.position
      el.createdAt = new Date(),
        el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Songs', Song, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {})
  }
};
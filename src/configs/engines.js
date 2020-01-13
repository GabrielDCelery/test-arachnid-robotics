const { ENGINE_SPIDER_LEGS, ENGINE_ROCKET } = require('../constants');

module.exports = {
  [ENGINE_SPIDER_LEGS]: {
    speed: 1,
    fuelPerDistance: 0,
    temperaturePerDistance: 0
  },
  [ENGINE_ROCKET]: {
    speed: Infinity,
    fuelPerDistance: 1,
    temperaturePerDistance: 1
  }
};

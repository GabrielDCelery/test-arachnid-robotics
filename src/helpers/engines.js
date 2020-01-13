const config = require('../configs');

class Engines {
  getRequirements({ type, distance }) {
    const engine = config['engines'][type];
    const time = distance / engine.speed;

    return {
      time: time === 0 ? 1 : time,
      fuel: engine['fuelPerDistance'] * distance,
      temperature: engine['temperaturePerDistance'] * distance
    };
  }
}

module.exports = new Engines();

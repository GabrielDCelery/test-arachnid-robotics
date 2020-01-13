const { STATE_ROBOT } = require('../../constants');
const SensorInterface = require('./SensorInterface');

class TemperatureSensor extends SensorInterface {
  _isSafe({ temperature }) {
    return (
      temperature + this.state.get(STATE_ROBOT).getTemperature() <=
      this.config.maxAllowedTemperature
    );
  }

  getRecommendation() {
    return (
      this.config.maxAllowedTemperature -
      this.state.get(STATE_ROBOT).getTemperature()
    );
  }
}

module.exports = TemperatureSensor;

const { STATE_ROBOT } = require('../../constants');
const SensorInterface = require('./SensorInterface');

class FuelSensor extends SensorInterface {
  _isSafe({ fuel }) {
    return fuel <= this.states.get(STATE_ROBOT).getFuel();
  }

  getRecommendation() {
    return this.states.get(STATE_ROBOT).getFuel();
  }
}

module.exports = FuelSensor;

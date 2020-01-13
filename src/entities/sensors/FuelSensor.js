const { STATE_ROBOT } = require('../../constants');
const SensorInterface = require('./SensorInterface');

class FuelSensor extends SensorInterface {
  _isSafe({ fuel }) {
    return fuel <= this.state.get(STATE_ROBOT).getFuel();
  }

  getRecommendation() {
    return this.state.get(STATE_ROBOT).getFuel();
  }
}

module.exports = FuelSensor;

const { STATE_TERRAIN } = require('../../constants');
const SensorInterface = require('./SensorInterface');

class TerrainSensor extends SensorInterface {
  _isSafe({ coordinates }) {
    return this.config['checkIfCoordinatesAreWithinGrid']
      ? this.state
          .get(STATE_TERRAIN)
          .areCoordinatesInsideBoundaries(coordinates)
      : true;
  }

  getRecommendation() {}
}

module.exports = TerrainSensor;

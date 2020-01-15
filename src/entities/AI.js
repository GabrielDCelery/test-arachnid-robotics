const {
  COMMAND_STAY_IN_PLACE,
  ENGINE_ROCKET,
  ENGINE_SPIDER_LEGS,
  SENSOR_FUEL,
  SENSOR_TEMPERATURE,
  SENSOR_TERRAIN,
  STATE_ROBOT
} = require('../constants');

class AI {
  constructor() {
    this.state = null;
  }

  static createInstance() {
    return new AI();
  }

  setStates(states) {
    this.states = states;

    return this;
  }

  setSensors(sensors) {
    this.sensors = sensors;

    return this;
  }

  selectEngine({ distance }) {
    if (1 < distance && this.states.get(STATE_ROBOT).hasEngine(ENGINE_ROCKET)) {
      return ENGINE_ROCKET;
    }

    return ENGINE_SPIDER_LEGS;
  }

  checkSpeed({ time }) {
    return time === 1;
  }

  checkSensors({ coordinates, temperature, fuel }) {
    const failedSensors = [
      SENSOR_FUEL,
      SENSOR_TEMPERATURE,
      SENSOR_TERRAIN
    ].filter(sensorType => {
      return (
        this.sensors
          .get(sensorType)
          .isSafe({ coordinates, temperature, fuel }) === false
      );
    });

    return {
      bAllSensorsPassed: failedSensors.length === 0,
      failedSensors
    };
  }

  generateFallbackCommand(/* failedSensors -> TODO make use of this param*/) {
    return { command: COMMAND_STAY_IN_PLACE, amount: 0 };
  }
}

module.exports = AI;

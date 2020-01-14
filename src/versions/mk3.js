const {
  COMMAND_MOVE_FORWARDS,
  COMMAND_TURN_LEFT,
  COMMAND_TURN_RIGHT,
  ENGINE_ROCKET,
  ENGINE_SPIDER_LEGS,
  FUEL_TANK_BASIC,
  SENSOR_FUEL,
  SENSOR_TEMPERATURE,
  SENSOR_TERRAIN
} = require('../constants');

module.exports = {
  version: 'mk3',
  engines: {
    [ENGINE_SPIDER_LEGS]: true,
    [ENGINE_ROCKET]: true
  },
  fuelTank: FUEL_TANK_BASIC,
  sensors: {
    [SENSOR_FUEL]: {
      enabled: true,
      config: {}
    },
    [SENSOR_TEMPERATURE]: {
      enabled: true,
      config: {
        maxAllowedTemperature: 5
      }
    },
    [SENSOR_TERRAIN]: {
      enabled: true,
      config: {
        checkIfCoordinatesAreWithinGrid: false
      }
    }
  },
  commandTransformations: {
    F: [{ command: COMMAND_MOVE_FORWARDS, amount: 1 }],
    B: [
      { command: COMMAND_TURN_RIGHT, amount: 180 },
      { command: COMMAND_MOVE_FORWARDS, amount: 1 }
    ],
    L: [{ command: COMMAND_TURN_LEFT, amount: 90 }],
    R: [{ command: COMMAND_TURN_RIGHT, amount: 90 }],
    xF: [{ command: COMMAND_MOVE_FORWARDS, amount: 'x' }]
  }
};

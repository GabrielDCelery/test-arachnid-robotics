const {
  COMMAND_MOVE_FORWARDS,
  COMMAND_TURN_LEFT,
  COMMAND_TURN_RIGHT,
  ENGINE_ROCKET,
  ENGINE_SPIDER_LEGS,
  FUEL_TANK_NONE,
  SENSOR_FUEL,
  SENSOR_TEMPERATURE,
  SENSOR_TERRAIN
} = require('../../constants');

module.exports = {
  version: 'mk2',
  engines: {
    [ENGINE_SPIDER_LEGS]: true,
    [ENGINE_ROCKET]: false
  },
  fuelTank: FUEL_TANK_NONE,
  sensors: {
    [SENSOR_FUEL]: {
      enabled: false,
      config: {}
    },
    [SENSOR_TEMPERATURE]: {
      enabled: false,
      config: {}
    },
    [SENSOR_TERRAIN]: {
      enabled: true,
      config: {
        checkIfCoordinatesAreWithinGrid: true
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

const {
  COMMAND_MOVE_BACKWARDS,
  COMMAND_MOVE_FORWARDS,
  COMMAND_MOVE_LEFT,
  COMMAND_MOVE_RIGHT,
  ENGINE_ROCKET,
  ENGINE_SPIDER_LEGS,
  FUEL_TANK_NONE,
  SENSOR_FUEL,
  SENSOR_TEMPERATURE,
  SENSOR_TERRAIN
} = require('../constants');

module.exports = {
  version: 'mk1',
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
      enabled: false,
      config: {}
    }
  },
  commandTransformations: {
    F: [{ command: COMMAND_MOVE_FORWARDS, amount: 1 }],
    B: [{ command: COMMAND_MOVE_BACKWARDS, amount: 1 }],
    L: [{ command: COMMAND_MOVE_LEFT, amount: 1 }],
    R: [{ command: COMMAND_MOVE_RIGHT, amount: 1 }],
    xF: [{ command: COMMAND_MOVE_FORWARDS, amount: 'x' }]
  }
};

import { IRobotConfiguration } from '../common/interfaces';
import { Command, Engine, FuelTank, Sensor } from '../common/enums';

const config: IRobotConfiguration = {
  version: 'mk3',
  engines: [Engine.ENGINE_SPIDER_LEGS, Engine.ENGINE_ROCKET],
  fuelTank: FuelTank.FUEL_TANK_BASIC,
  sensors: {
    [Sensor.SENSOR_FUEL]: {
      enabled: true,
      config: {}
    },
    [Sensor.SENSOR_TEMPERATURE]: {
      enabled: true,
      config: {
        maxAllowedTemperature: 5
      }
    },
    [Sensor.SENSOR_TERRAIN]: {
      enabled: true,
      config: {
        checkIfCoordinatesAreWithinGrid: false
      }
    }
  },
  commandTransformations: {
    F: [{ command: Command.COMMAND_MOVE_FORWARDS, amount: 1 }],
    B: [
      { command: Command.COMMAND_TURN_RIGHT, amount: 180 },
      { command: Command.COMMAND_MOVE_FORWARDS, amount: 1 }
    ],
    L: [{ command: Command.COMMAND_TURN_LEFT, amount: 90 }],
    R: [{ command: Command.COMMAND_TURN_RIGHT, amount: 90 }],
    xF: [{ command: Command.COMMAND_MOVE_FORWARDS, amount: 'x' }]
  }
};

export default config;

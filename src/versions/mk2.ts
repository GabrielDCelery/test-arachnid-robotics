import { IRobotConfiguration } from '../common/interfaces';
import { Command, Engine, FuelTank, Sensor } from '../common/enums';

const config: IRobotConfiguration = {
  version: 'mk2',
  engines: [Engine.ENGINE_SPIDER_LEGS],
  fuelTank: FuelTank.FUEL_TANK_NONE,
  sensors: {
    [Sensor.SENSOR_FUEL]: {
      enabled: false,
      config: {}
    },
    [Sensor.SENSOR_TEMPERATURE]: {
      enabled: false,
      config: {}
    },
    [Sensor.SENSOR_TERRAIN]: {
      enabled: true,
      config: {
        checkIfCoordinatesAreWithinGrid: true
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

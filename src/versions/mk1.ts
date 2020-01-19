import { IRobotConfiguration } from '../common/interfaces';
import { Command, Engine, FuelTank, Sensor } from '../common/enums';

const config: IRobotConfiguration = {
  version: 'mk1',
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
      enabled: false,
      config: {}
    }
  },
  commandTransformations: {
    F: [{ command: Command.COMMAND_MOVE_FORWARDS, amount: 1 }],
    B: [{ command: Command.COMMAND_MOVE_BACKWARDS, amount: 1 }],
    L: [{ command: Command.COMMAND_MOVE_LEFT, amount: 1 }],
    R: [{ command: Command.COMMAND_MOVE_RIGHT, amount: 1 }],
    xF: [{ command: Command.COMMAND_MOVE_FORWARDS, amount: 'x' }]
  }
};

export default config;

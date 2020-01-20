import { IRobotConfiguration } from '../common/interfaces';
import {
  Command as CommandEnums,
  Engine as EngineEnums,
  FuelTank as FuelTankEnums,
  Sensor as SensorEnums
} from '../common/enums';

const {
  COMMAND_MOVE_FORWARDS,
  COMMAND_MOVE_BACKWARDS,
  COMMAND_MOVE_LEFT,
  COMMAND_MOVE_RIGHT
} = CommandEnums;
const { ENGINE_SPIDER_LEGS } = EngineEnums;
const { FUEL_TANK_NONE } = FuelTankEnums;
const { SENSOR_FUEL, SENSOR_TEMPERATURE, SENSOR_TERRAIN } = SensorEnums;

const config: IRobotConfiguration = {
  version: 'mk1',
  engines: [ENGINE_SPIDER_LEGS],
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

export default config;

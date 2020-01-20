import { IRobotConfiguration } from '../common/interfaces';
import {
  Command as CommandEnums,
  Engine as EngineEnums,
  FuelTank as FuelTankEnums,
  Sensor as SensorEnums
} from '../common/enums';

const {
  COMMAND_MOVE_FORWARDS,
  COMMAND_TURN_RIGHT,
  COMMAND_TURN_LEFT
} = CommandEnums;
const { ENGINE_SPIDER_LEGS } = EngineEnums;
const { FUEL_TANK_NONE } = FuelTankEnums;
const { SENSOR_FUEL, SENSOR_TEMPERATURE, SENSOR_TERRAIN } = SensorEnums;

const config: IRobotConfiguration = {
  version: 'mk2',
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

export default config;

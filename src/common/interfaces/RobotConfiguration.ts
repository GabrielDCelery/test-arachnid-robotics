import {
  Command as CommandEnums,
  Engine as EngineEnums,
  FuelTank as FuelTankEnums,
  Sensor as SensorEnums
} from '../enums';

const { SENSOR_FUEL, SENSOR_TEMPERATURE, SENSOR_TERRAIN } = SensorEnums;

export interface ISensorFuel {
  enabled: boolean;
  config: {};
}

export interface ISensorTemperature {
  enabled: boolean;
  config: {
    maxAllowedTemperature?: number;
  };
}

export interface ISensorTerrain {
  enabled: boolean;
  config: {
    checkIfCoordinatesAreWithinGrid?: boolean;
  };
}

export interface ICommandConfig {
  command: CommandEnums;
  amount: number | string;
}

export type ICommandTransformations = {
  [key: string]: any;
  F: ICommandConfig[];
  B: ICommandConfig[];
  L: ICommandConfig[];
  R: ICommandConfig[];
  xF: ICommandConfig[];
};

export interface IRobotConfiguration {
  version: string;
  engines: EngineEnums[];
  fuelTank: FuelTankEnums;
  sensors: {
    [SENSOR_FUEL]: ISensorFuel;
    [SENSOR_TEMPERATURE]: ISensorTemperature;
    [SENSOR_TERRAIN]: ISensorTerrain;
  };
  commandTransformations: ICommandTransformations;
}

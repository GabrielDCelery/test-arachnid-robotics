import {
  Command as CommandEnums,
  Engine as EngineEnums,
  FuelTank as FuelTankEnums,
  Sensor as SensorEnums
} from '../enums';

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

export interface IRobotConfiguration {
  version: string;
  engines: EngineEnums[];
  fuelTank: FuelTankEnums;
  sensors: {
    [SensorEnums.SENSOR_FUEL]: ISensorFuel;
    [SensorEnums.SENSOR_TEMPERATURE]: ISensorTemperature;
    [SensorEnums.SENSOR_TERRAIN]: ISensorTerrain;
  };
  commandTransformations: {
    F: ICommandConfig[];
    B: ICommandConfig[];
    L: ICommandConfig[];
    R: ICommandConfig[];
    xF: ICommandConfig[];
  };
}

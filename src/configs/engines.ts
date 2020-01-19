import { Engine as EngineEnums } from '../common/enums';

interface EngineConfig {
  speed: number;
  fuelPerDistance: number;
  temperaturePerDistance: number;
}

type EngineConfigs = {
  [key in EngineEnums]?: EngineConfig;
};

const config: EngineConfigs = {
  [EngineEnums.ENGINE_SPIDER_LEGS]: {
    speed: 1,
    fuelPerDistance: 0,
    temperaturePerDistance: 0
  },
  [EngineEnums.ENGINE_ROCKET]: {
    speed: Infinity,
    fuelPerDistance: 1,
    temperaturePerDistance: 1
  }
};

export default config;

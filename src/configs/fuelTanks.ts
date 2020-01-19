import { FuelTank as FuelTankEnums } from '../common/enums';

interface FuelTankConfig {
  amount: number;
}

type FuelTankConfigs = {
  [key in FuelTankEnums]?: FuelTankConfig;
};

const config: FuelTankConfigs = {
  [FuelTankEnums.FUEL_TANK_NONE]: {
    amount: 0
  },
  [FuelTankEnums.FUEL_TANK_BASIC]: {
    amount: 30
  }
};

export default config;

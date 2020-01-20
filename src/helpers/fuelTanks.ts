import { FuelTank as FuelTankEnums } from '../common/enums';
import configs from '../configs';

const getAmount = ({ type }: { type: FuelTankEnums }): number => {
  return configs['fuelTanks'][type]['amount'];
};

export default {
  getAmount
};

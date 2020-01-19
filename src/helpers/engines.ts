import { Engine as EngineEnums } from '../common/enums';
import configs from '../configs';

const getRequirements = ({
  type,
  distance
}: {
  type: EngineEnums;
  distance: number;
}): {
  time: number;
  fuel: number;
  temperature: number;
} => {
  const engine = configs['engines'][type];
  const time = distance / engine.speed;

  return {
    time: time === 0 ? 1 : time,
    fuel: engine['fuelPerDistance'] * distance,
    temperature: engine['temperaturePerDistance'] * distance
  };
};

export default {
  getRequirements
};

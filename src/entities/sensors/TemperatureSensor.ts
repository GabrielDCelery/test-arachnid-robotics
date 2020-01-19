import { State as StateEnums, String as StringEnums } from '../../common/enums';
import Sensor from './Sensor';

const { STATE_ROBOT } = StateEnums;
const { STRING_TEMPERATURE } = StringEnums;

class TemperatureSensor extends Sensor {
  _isSafe({ temperature }: { temperature: number }) {
    return (
      temperature + this.states.get(STATE_ROBOT).get(STRING_TEMPERATURE) <=
      this.config.maxAllowedTemperature
    );
  }

  getRecommendation() {
    return (
      this.config.maxAllowedTemperature -
      this.states.get(STATE_ROBOT).get(STRING_TEMPERATURE)
    );
  }
}

export default TemperatureSensor;

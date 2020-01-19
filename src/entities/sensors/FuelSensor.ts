import { State as StateEnums, String as StringEnums } from '../../common/enums';
import Sensor from './Sensor';

const { STATE_ROBOT } = StateEnums;
const { STRING_FUEL } = StringEnums;

class FuelSensor extends Sensor {
  _isSafe({ fuel }: { fuel: number }) {
    return fuel <= this.states.get(STATE_ROBOT).get(STRING_FUEL);
  }

  getRecommendation() {
    return this.states.get(STATE_ROBOT).get(STRING_FUEL);
  }
}

export default FuelSensor;

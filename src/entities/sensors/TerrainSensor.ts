import { State as StateEnums, String as StringEnums } from '../../common/enums';
import { ICoordinates } from '../../common/interfaces';
import Sensor from './Sensor';
import { graph as helperGraph } from '../../helpers';

const { STATE_TERRAIN } = StateEnums;
const { STRING_SIZE } = StringEnums;

class TerrainSensor extends Sensor {
  _isSafe({ coordinates }: { coordinates: ICoordinates }) {
    return this.config['checkIfCoordinatesAreWithinGrid']
      ? helperGraph.areCoordinatesInsideBoundaries({
          size: this.states.get(STATE_TERRAIN).get(STRING_SIZE),
          coordinates
        })
      : true;
  }

  getRecommendation() {}
}

export default TerrainSensor;

import { State as StateEnums } from '../../common/enums';
import State from './State';

const { STATE_ROBOT, STATE_TERRAIN } = StateEnums;

interface IStatesFactory {
  get(stateType: StateEnums): any;
}

class StatesFactory implements IStatesFactory {
  public states: {
    [STATE_ROBOT]: State;
    [STATE_TERRAIN]: State;
  };

  constructor() {
    this.states = {
      [STATE_ROBOT]: new State(),
      [STATE_TERRAIN]: new State()
    };
  }

  static createInstance() {
    return new StatesFactory();
  }

  get(stateType: StateEnums) {
    return this.states[stateType];
  }
}

export default StatesFactory;

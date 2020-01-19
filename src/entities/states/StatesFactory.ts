import { State as StateEnums } from '../../common/enums';
import State from './State';

interface IStatesFactory {
  get(stateType: StateEnums): any;
}

class StatesFactory implements IStatesFactory {
  public states: {
    [StateEnums.STATE_ROBOT]: State;
    [StateEnums.STATE_TERRAIN]: State;
  };

  constructor() {
    this.states = {
      [StateEnums.STATE_ROBOT]: new State(),
      [StateEnums.STATE_TERRAIN]: new State()
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

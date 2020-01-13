const { STATE_ROBOT, STATE_TERRAIN } = require('../../constants');

const RobotState = require('./RobotState');
const TerrainState = require('./TerrainState');

class StatesFactory {
  constructor() {
    this.states = {
      [STATE_ROBOT]: new RobotState(),
      [STATE_TERRAIN]: new TerrainState()
    };
  }

  static createInstance() {
    return new StatesFactory();
  }

  get(stateType) {
    return this.states[stateType];
  }
}

module.exports = StatesFactory;

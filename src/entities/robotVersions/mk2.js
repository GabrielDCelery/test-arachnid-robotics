const {
  COMMAND_MOVE_FORWARDS,
  COMMAND_TURN_LEFT,
  COMMAND_TURN_RIGHT,
  COMMAND_TURN_BACK
} = require('../../constants');

module.exports = {
  commandTransformations: {
    F: [COMMAND_MOVE_FORWARDS],
    B: [COMMAND_TURN_BACK, COMMAND_MOVE_FORWARDS],
    L: [COMMAND_TURN_LEFT],
    R: [COMMAND_TURN_RIGHT]
  },
  commandValidators: {
    checkIfCoordinatesAreWithinGrid: true
  }
};

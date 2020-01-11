const {
  COMMAND_MOVE_FORWARDS,
  COMMAND_MOVE_BACKWARDS,
  COMMAND_MOVE_RIGHT,
  COMMAND_MOVE_LEFT
} = require('../../constants');

module.exports = {
  commandTransformations: {
    F: [COMMAND_MOVE_FORWARDS],
    B: [COMMAND_MOVE_BACKWARDS],
    L: [COMMAND_MOVE_LEFT],
    R: [COMMAND_MOVE_RIGHT]
  },
  commandValidators: {
    checkIfCoordinatesAreWithinGrid: false
  }
};

const { FORWARDS, BACKWARDS, LEFT, RIGHT } = require('../constants');

class Robot {
  constructor() {
    this.x = null;
    this.y = null;
    this.testChamber = null;
  }

  static get COMMANDS_TO_DIRECTIONS() {
    return {
      F: FORWARDS,
      B: BACKWARDS,
      L: LEFT,
      R: RIGHT
    };
  }

  static createInstance() {
    return new Robot();
  }

  _interpretInputString(inputString) {
    const [x, y, commandSequence] = inputString.split(',');

    return {
      x: parseInt(x),
      y: parseInt(y),
      commandSequence
    };
  }

  _setLocation({ x, y }) {
    this.x = x;
    this.y = y;
  }

  _processCommandSequence(commandSequence) {
    for (let i = 0, iMax = commandSequence.length; i < iMax; i++) {
      const command = commandSequence[i];
      const direction = Robot.COMMANDS_TO_DIRECTIONS[command];
      const { x, y } = this.testChamber.getCoordinatesTowardsDirection({
        x: this.x,
        y: this.y,
        direction
      });
      this._setLocation({ x, y });
    }
  }

  setTestChamber(testChamber) {
    this.testChamber = testChamber;

    return this;
  }

  getCurrentLocation() {
    return {
      x: this.x,
      y: this.y
    };
  }

  processInput(inputString) {
    const { x, y, commandSequence } = this._interpretInputString(inputString);
    this._setLocation({ x, y });
    this._processCommandSequence(commandSequence);

    return this;
  }
}

module.exports = Robot;

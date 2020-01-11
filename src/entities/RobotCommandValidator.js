const robotVersions = require('./robotVersions');

class RobotCommandValidator {
  constructor() {
    this.commandValidators = null;
  }

  static createInstance() {
    return new RobotCommandValidator();
  }

  setVersion(version) {
    if (!robotVersions[version]) {
      throw new Error(`Invalid robot version ${version}`);
    }

    this.commandValidators = robotVersions[version]['commandValidators'];

    return this;
  }

  setGrid(grid) {
    this.grid = grid;

    return this;
  }

  areCoordinatesSafe({ x, y }) {
    return this.commandValidators['checkIfCoordinatesAreWithinGrid'] === true
      ? this.grid.areCoordinatesInsideBoundaries({ x, y })
      : true;
  }
}

module.exports = RobotCommandValidator;

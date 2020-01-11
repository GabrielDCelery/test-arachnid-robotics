const robotVersions = require('./robotVersions');

class RobotCommandInterpreter {
  constructor() {
    this.commandTransformations = null;
  }

  static createInstance() {
    return new RobotCommandInterpreter();
  }

  setVersion(version) {
    if (!robotVersions[version]) {
      throw new Error(`Invalid robot version ${version}`);
    }

    this.commandTransformations =
      robotVersions[version]['commandTransformations'];

    return this;
  }

  interpretInputString(inputString) {
    const [x, y, commandInputs] = inputString.split(',');

    return {
      x: parseInt(x),
      y: parseInt(y),
      commandInputs: commandInputs.split('')
    };
  }

  transformInputToCommands(commandInput) {
    return this.commandTransformations[commandInput];
  }
}

module.exports = RobotCommandInterpreter;

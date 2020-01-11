const RobotState = require('./RobotState');
const RobotCommandValidator = require('./RobotCommandValidator');
const RobotCommandInterpreter = require('./RobotCommandInterpreter');
const Grid = require('./Grid');

class Robot {
  constructor() {
    this.state = RobotState.createInstance();
    this.commandInterpreter = RobotCommandInterpreter.createInstance();
    this.commandValidator = RobotCommandValidator.createInstance();
  }

  static createInstance() {
    return new Robot();
  }

  setVersion(version) {
    this.commandInterpreter.setVersion(version);
    this.commandValidator.setVersion(version);

    return this;
  }

  setSurface({ sizeX, sizeY }) {
    const grid = Grid.createInstance({ sizeX, sizeY });
    this.commandValidator.setGrid(grid);

    return this;
  }

  getCoordinates() {
    return this.state.getCoordinates();
  }

  processInput(inputString) {
    const {
      x,
      y,
      commandInputs
    } = this.commandInterpreter.interpretInputString(inputString);
    this.state.setCoordinates({ x, y }).setDirection({});

    commandInputs.forEach(commandInput => {
      const commands = this.commandInterpreter.transformInputToCommands(
        commandInput
      );

      commands.forEach(command => {
        const { coordinates, direction } = this.state.getNewState({ command });
        const bIsSafe = this.commandValidator.areCoordinatesSafe(coordinates);

        if (!bIsSafe) {
          return;
        }

        this.state.setCoordinates(coordinates).setDirection(direction);
      });
    });

    return this;
  }
}

module.exports = Robot;

const versions = require('./versions');
const AI = require('./AI');
const CommandsFactory = require('./commands/CommandsFactory');
const StatesFactory = require('./states/StatesFactory');
const SensorsFactory = require('./sensors/SensorsFactory');
const {
  COMMANDS_ANALYSER,
  COMMANDS_INTERPRETER,
  SENSOR_FUEL,
  SENSOR_TEMPERATURE,
  SENSOR_TERRAIN,
  STATE_ROBOT,
  STATE_TERRAIN
} = require('../constants');
const { engines, fuelTanks } = require('../helpers');

class App {
  constructor() {
    this.ai = AI.createInstance();
    this.states = StatesFactory.createInstance();
    this.sensors = SensorsFactory.createInstance();
    this.commands = CommandsFactory.createInstance();
  }

  static createInstance() {
    return new App();
  }

  setVersion(versionId) {
    if (!versions[versionId]) {
      throw new Error(`Invalid robot version ${versionId}`);
    }

    const version = versions[versionId];

    this.states
      .get(STATE_ROBOT)
      .setVersion(versionId)
      .setEngines(version['engines'])
      .setFuel(fuelTanks.getAmount({ type: version['fuelTank'] }));

    [(SENSOR_FUEL, SENSOR_TEMPERATURE, SENSOR_TERRAIN)].forEach(sensorType => {
      this.sensors
        .get(sensorType)
        .setEnabled(version['sensors'][sensorType]['enabled'])
        .linkWithStates(this.states)
        .setConfig(version['sensors'][sensorType]['config']);
    });

    this.ai.setStates(this.states).setSensors(this.sensors);

    this.commands
      .get(COMMANDS_INTERPRETER)
      .setTransformations(version['commandTransformations']);

    return this;
  }

  setTerrain({ sizeX, sizeY }) {
    this.states.get(STATE_TERRAIN).setSize({ sizeX, sizeY });

    return this;
  }

  getCoordinates() {
    return JSON.parse(
      JSON.stringify(this.states.get(STATE_ROBOT).getCoordinates())
    );
  }

  _actionCommand({ coordinates, direction, fuel, temperature }) {
    const robotState = this.states.get(STATE_ROBOT);

    robotState
      .setCoordinates(coordinates)
      .setDirection(direction)
      .setFuel(robotState.getFuel() - fuel)
      .setTemperature(robotState.getTemperature() + temperature)
      .setTemperature(0); // There is no heat buildup at the moment
  }

  _processCommand({ command, amount }) {
    const robotState = this.states.get(STATE_ROBOT);

    const { coordinates, direction, distance } = this.commands
      .get(COMMANDS_ANALYSER)
      .getDesiredPosition({
        coordinates: robotState.getCoordinates(),
        direction: robotState.getDirection(),
        command,
        amount
      });

    const { fuel, temperature } = engines.getRequirements({
      type: this.ai.selectEngine({ distance }),
      distance
    });

    const { bAllSensorsPassed, failedSensors } = this.ai.checkSensors({
      coordinates,
      temperature,
      fuel
    });

    if (bAllSensorsPassed) {
      return this._actionCommand({ coordinates, direction, fuel, temperature });
    }

    return this._processCommand(this.ai.generateFallbackCommand(failedSensors));
  }

  processInput(inputString) {
    const [x, y, commandInputSequence] = inputString.split(',');

    this.states
      .get(STATE_ROBOT)
      .setCoordinates({ x: parseInt(x), y: parseInt(y) })
      .setDirection({});

    const commandsInterpreter = this.commands.get(COMMANDS_INTERPRETER);

    commandsInterpreter.setInputSequence(commandInputSequence);

    while (commandsInterpreter.hasNotFinishedProcessing()) {
      const commands = commandsInterpreter.getNextCommand();

      commands.forEach(({ command, amount }) => {
        return this._processCommand({ command, amount });
      });
    }

    return this;
  }
}

module.exports = App;

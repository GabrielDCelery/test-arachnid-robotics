const CommandsFactory = require('./commands/CommandsFactory');
import versions from '../versions';
import AI from './AI';
import StatesFactory from './states/StatesFactory';
import SensorsFactory from './sensors/SensorsFactory';
import { ISize, ICoordinates, IVector } from '../common/interfaces';
import {
  Command as CommandEnums,
  Commands as CommandsEnums,
  Sensor as SensorEnums,
  State as StateEnums,
  String as StringEnums
} from '../common/enums';
import {
  engines as helperEngines,
  fuelTanks as helperFuelTanks
} from '../helpers';

const { COMMANDS_ANALYSER, COMMANDS_INTERPRETER } = CommandsEnums;
const { STATE_ROBOT, STATE_TERRAIN } = StateEnums;
const { SENSOR_FUEL, SENSOR_TEMPERATURE, SENSOR_TERRAIN } = SensorEnums;
const {
  STRING_COORDINATES,
  STRING_DIRECTION,
  STRING_ENGINES,
  STRING_FUEL,
  STRING_SIZE,
  STRING_TEMPERATURE,
  STRING_VERSION
} = StringEnums;

interface IApp {
  _actionCommand({
    coordinates,
    direction,
    fuel,
    temperature
  }: {
    coordinates: ICoordinates;
    direction: IVector;
    fuel: number;
    temperature: number;
  }): void;
  _processCommand({
    command,
    amount
  }: {
    command: CommandEnums;
    amount: number;
  }): any;
  setVersion(versionId: string): this;
  setTerrain({ sizeX, sizeY }: ISize): this;
  getCoordinates(): ICoordinates;
}

class App implements IApp {
  private ai: AI;
  private states: StatesFactory;
  private sensors: SensorsFactory;
  private commands: any;

  constructor() {
    this.ai = AI.createInstance();
    this.states = StatesFactory.createInstance();
    this.sensors = SensorsFactory.createInstance();
    this.commands = CommandsFactory.createInstance();
  }

  static createInstance() {
    return new App();
  }

  _actionCommand({
    coordinates,
    direction,
    fuel,
    temperature
  }: {
    coordinates: ICoordinates;
    direction: IVector;
    fuel: number;
    temperature: number;
  }) {
    const robotState = this.states.get(STATE_ROBOT);

    robotState
      .set(STRING_COORDINATES, coordinates)
      .set(STRING_DIRECTION, direction)
      .set(STRING_FUEL, robotState.get(STRING_FUEL) - fuel)
      .set(STRING_TEMPERATURE, robotState.get(STRING_TEMPERATURE) + temperature)
      .set(STRING_TEMPERATURE, 0); // There is no heat buildup at the moment
  }

  _processCommand({
    command,
    amount
  }: {
    command: CommandEnums;
    amount: number;
  }): any {
    const robotState = this.states.get(STATE_ROBOT);

    const { coordinates, direction, distance } = this.commands
      .get(COMMANDS_ANALYSER)
      .getDesiredPosition({
        coordinates: robotState.get(STRING_COORDINATES),
        direction: robotState.get(STRING_DIRECTION),
        command,
        amount
      });

    const { fuel, temperature, time } = helperEngines.getRequirements({
      type: this.ai.selectEngine({ distance }),
      distance
    });

    const bCanDoMoveInOneTick = this.ai.checkSpeed({ time });

    if (!bCanDoMoveInOneTick) {
      return this._processCommand(this.ai.generateFallbackCommand());
    }

    const { bAllSensorsPassed, failedSensors } = this.ai.checkSensors({
      coordinates,
      temperature,
      fuel
    });

    if (!bAllSensorsPassed) {
      return this._processCommand(
        this.ai.generateFallbackCommand(/*failedSensors*/)
      );
    }

    return this._actionCommand({ coordinates, direction, fuel, temperature });
  }

  setVersion(versionId: string) {
    if (!versions[versionId]) {
      throw new Error(`Invalid robot version ${versionId}`);
    }

    const version = versions[versionId];

    this.states
      .get(STATE_ROBOT)
      .set(STRING_VERSION, versionId)
      .set(STRING_ENGINES, version['engines'])
      .set(
        STRING_FUEL,
        helperFuelTanks.getAmount({ type: version['fuelTank'] })
      );

    [SENSOR_FUEL, SENSOR_TEMPERATURE, SENSOR_TERRAIN].forEach(sensorType => {
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

  setTerrain(size: ISize) {
    this.states.get(STATE_TERRAIN).set(STRING_SIZE, size);

    return this;
  }

  getCoordinates() {
    return JSON.parse(
      JSON.stringify(this.states.get(STATE_ROBOT).get(STRING_COORDINATES))
    );
  }

  processInput(inputString: string) {
    const [x, y, commandInputSequence] = inputString.split(',');

    this.states
      .get(STATE_ROBOT)
      .set(STRING_COORDINATES, { x: parseInt(x), y: parseInt(y) })
      .set(STRING_DIRECTION, {});

    const commandsInterpreter = this.commands.get(COMMANDS_INTERPRETER);

    commandsInterpreter.setInputSequence(commandInputSequence);

    while (commandsInterpreter.hasNotFinishedProcessing()) {
      const commands = commandsInterpreter.getNextCommand();

      commands.forEach(
        ({ command, amount }: { command: CommandEnums; amount: number }) => {
          return this._processCommand({ command, amount });
        }
      );
    }

    return this;
  }
}

export default App;

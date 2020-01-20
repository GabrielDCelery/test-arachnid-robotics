import { ICoordinates } from '../common/interfaces';
import {
  Command as CommandEnums,
  Engine as EngineEnums,
  Sensor as SensorEnums,
  State as StateEnums,
  String as StringEnums
} from '../common/enums';
import StatesFactory from './states/StatesFactory';
import SensorsFactory from './sensors/SensorsFactory';

const { STATE_ROBOT } = StateEnums;
const { STRING_ENGINES } = StringEnums;
const { SENSOR_FUEL, SENSOR_TEMPERATURE, SENSOR_TERRAIN } = SensorEnums;

interface IAI {
  setStates(states: StatesFactory): this;
  setSensors(sensors: SensorsFactory): this;
  selectEngine({ distance }: { distance: number }): EngineEnums;
  checkSpeed({ time }: { time: number }): boolean;
  checkSensors({
    coordinates,
    temperature,
    fuel
  }: {
    coordinates: ICoordinates;
    temperature: number;
    fuel: number;
  }): {
    bAllSensorsPassed: boolean;
    failedSensors: SensorEnums[];
  };
  generateFallbackCommand(): {
    command: CommandEnums;
    amount: number;
  };
}

class AI implements IAI {
  private states: StatesFactory;
  private sensors: SensorsFactory;

  static createInstance() {
    return new AI();
  }

  setStates(states: StatesFactory) {
    this.states = states;

    return this;
  }

  setSensors(sensors: SensorsFactory) {
    this.sensors = sensors;

    return this;
  }

  selectEngine({ distance }: { distance: number }) {
    if (
      1 < distance &&
      this.states
        .get(STATE_ROBOT)
        .get(STRING_ENGINES)
        .includes(EngineEnums.ENGINE_ROCKET)
    ) {
      return EngineEnums.ENGINE_ROCKET;
    }

    return EngineEnums.ENGINE_SPIDER_LEGS;
  }

  checkSpeed({ time }: { time: number }) {
    return time === 1;
  }

  checkSensors({
    coordinates,
    temperature,
    fuel
  }: {
    coordinates: ICoordinates;
    temperature: number;
    fuel: number;
  }) {
    const failedSensors = [
      SENSOR_FUEL,
      SENSOR_TEMPERATURE,
      SENSOR_TERRAIN
    ].filter(sensorType => {
      return (
        this.sensors
          .get(sensorType)
          .isSafe({ coordinates, temperature, fuel }) === false
      );
    });

    return {
      bAllSensorsPassed: failedSensors.length === 0,
      failedSensors
    };
  }

  generateFallbackCommand(/* failedSensors -> TODO make use of this param*/) {
    return { command: CommandEnums.COMMAND_STAY_IN_PLACE, amount: 0 };
  }
}

export default AI;

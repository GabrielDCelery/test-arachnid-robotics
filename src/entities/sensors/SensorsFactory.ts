import { Sensor as SensorEnums } from '../../common/enums';
import FuelSensor from './FuelSensor';
import TemperatureSensor from './TemperatureSensor';
import TerrainSensor from './TerrainSensor';

const { SENSOR_FUEL, SENSOR_TEMPERATURE, SENSOR_TERRAIN } = SensorEnums;

interface ISensorsFactory {
  get(stateType: SensorEnums): FuelSensor | TemperatureSensor | TerrainSensor;
}

class SensorsFactory implements ISensorsFactory {
  private sensors: {
    [SENSOR_FUEL]: FuelSensor;
    [SENSOR_TEMPERATURE]: TemperatureSensor;
    [SENSOR_TERRAIN]: TerrainSensor;
  };

  constructor() {
    this.sensors = {
      [SENSOR_FUEL]: new FuelSensor(),
      [SENSOR_TEMPERATURE]: new TemperatureSensor(),
      [SENSOR_TERRAIN]: new TerrainSensor()
    };
  }

  static createInstance() {
    return new SensorsFactory();
  }

  get(sensorType: SensorEnums) {
    return this.sensors[sensorType];
  }
}

export default SensorsFactory;

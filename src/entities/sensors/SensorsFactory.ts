import { Sensor as SensorEnums } from '../../common/enums';
import FuelSensor from './FuelSensor';
import TemperatureSensor from './TemperatureSensor';
import TerrainSensor from './TerrainSensor';

interface ISensorsFactory {
  get(stateType: SensorEnums): FuelSensor | TemperatureSensor | TerrainSensor;
}

class SensorsFactory implements ISensorsFactory {
  private sensors: {
    [SensorEnums.SENSOR_FUEL]: FuelSensor;
    [SensorEnums.SENSOR_TEMPERATURE]: TemperatureSensor;
    [SensorEnums.SENSOR_TERRAIN]: TerrainSensor;
  };

  constructor() {
    this.sensors = {
      [SensorEnums.SENSOR_FUEL]: new FuelSensor(),
      [SensorEnums.SENSOR_TEMPERATURE]: new TemperatureSensor(),
      [SensorEnums.SENSOR_TERRAIN]: new TerrainSensor()
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

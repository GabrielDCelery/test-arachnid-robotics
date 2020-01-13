const {
  SENSOR_FUEL,
  SENSOR_TEMPERATURE,
  SENSOR_TERRAIN
} = require('../../constants');

const FuelSensor = require('./FuelSensor');
const TemperatureSensor = require('./TemperatureSensor');
const TerrainSensor = require('./TerrainSensor');

class SensorsFactory {
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

  get(sensorType) {
    return this.sensors[sensorType];
  }
}

module.exports = SensorsFactory;

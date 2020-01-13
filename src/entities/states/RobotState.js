class RobotState {
  constructor() {
    this.version = null;
    this.fuel = 0;
    this.temperature = 0;
    this.coordinates = { x: null, y: null };
    this.direction = { x: null, y: null };
    this.engines = {};
  }

  getVersion() {
    return this.version;
  }

  getFuel() {
    return this.fuel;
  }

  getTemperature() {
    return this.temperature;
  }

  getCoordinates() {
    return this.coordinates;
  }

  getDirection() {
    return this.direction;
  }

  hasEngine(type) {
    return Object.prototype.hasOwnProperty.call(this.engines, type);
  }

  setVersion(version) {
    this.version = version;

    return this;
  }

  setEngines(engines) {
    this.engines = engines;

    return this;
  }

  setFuel(fuel) {
    this.fuel = fuel;

    return this;
  }

  setTemperature(temperature) {
    this.temperature = temperature;

    return this;
  }

  setCoordinates({ x = 0, y = 0 }) {
    this.coordinates = { x, y };

    return this;
  }

  setDirection({ x = 0, y = 1 }) {
    this.direction = { x, y };

    return this;
  }
}

module.exports = RobotState;

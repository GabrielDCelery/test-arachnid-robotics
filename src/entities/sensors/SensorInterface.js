class SensorInterface {
  constructor() {
    this.enabled = false;
    this.robotState = null;
    this.config = null;
  }

  setEnabled(bEnabled) {
    this.enabled = bEnabled === true;

    return this;
  }

  linkWithStates(state) {
    this.state = state;

    return this;
  }

  setConfig(config) {
    this.config = config;

    return this;
  }

  isEnabled() {
    return this.enabled === true;
  }

  _isSafe() {
    throw new Error('Should be overriden!');
  }

  isSafe() {
    if (!this.isEnabled()) {
      return true;
    }

    return this._isSafe(...arguments);
  }

  getRecommendation() {
    throw new Error('Should be overriden!');
  }
}

module.exports = SensorInterface;

import {
  ISensorFuel,
  ISensorTemperature,
  ISensorTerrain
} from '../../common/interfaces';
import StatesFactory from '../states/StatesFactory';

interface ISensor {
  setEnabled(bEnabled: boolean): this;
  linkWithStates(states: StatesFactory): this;
  setConfig(config: ISensorFuel | ISensorTemperature | ISensorTerrain): this;
  isEnabled(): boolean;
  _isSafe(argObj: { [key: string]: any }): boolean;
  isSafe(argObj: { [key: string]: any }): boolean;
}

abstract class Sensor implements ISensor {
  private enabled: boolean;
  public states: StatesFactory;
  public config: any;

  abstract _isSafe(args: any): boolean;
  abstract getRecommendation(): any;

  constructor() {
    this.enabled = false;
    this.states = null;
    this.config = null;
  }

  setEnabled(bEnabled: boolean) {
    this.enabled = bEnabled === true;

    return this;
  }

  linkWithStates(states: StatesFactory) {
    this.states = states;

    return this;
  }

  setConfig(config: ISensorFuel | ISensorTemperature | ISensorTerrain) {
    this.config = config;

    return this;
  }

  isEnabled() {
    return this.enabled === true;
  }

  isSafe(argObj: { [key: string]: any }) {
    if (!this.isEnabled()) {
      return true;
    }

    return this._isSafe(argObj);
  }
}

export default Sensor;

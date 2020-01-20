import { String as StringEnums } from '../../common/enums';

const {
  STRING_COORDINATES,
  STRING_DIRECTION,
  STRING_ENGINES,
  STRING_FUEL,
  STRING_SIZE,
  STRING_TEMPERATURE,
  STRING_VERSION
} = StringEnums;

interface IState {
  get(what: StringEnums): any;
  has(what: StringEnums): boolean;
  set(what: StringEnums, value: any): this;
}

class State implements IState {
  private whats: {
    [StringEnums.STRING_COORDINATES]: any;
    [STRING_DIRECTION]: any;
    [STRING_ENGINES]: any;
    [STRING_FUEL]: any;
    [STRING_SIZE]: any;
    [STRING_TEMPERATURE]: any;
    [STRING_VERSION]: any;
  };

  constructor() {
    this.whats = {
      [STRING_COORDINATES]: null,
      [STRING_DIRECTION]: null,
      [STRING_ENGINES]: null,
      [STRING_FUEL]: null,
      [STRING_SIZE]: null,
      [STRING_TEMPERATURE]: null,
      [STRING_VERSION]: null
    };
  }

  get(what: StringEnums) {
    return this.whats[what];
  }

  has(what: StringEnums) {
    return Object.prototype.hasOwnProperty.call(this.whats, what);
  }

  set(what: StringEnums, value: any) {
    this.whats[what] = value;

    return this;
  }
}

export default State;

import { String as StringEnums } from '../../common/enums';

interface IState {
  get(what: StringEnums): any;
  has(what: StringEnums): boolean;
  set(what: StringEnums, value: any): this;
}

class State implements IState {
  private whats: {
    [key in StringEnums]: any;
  };

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

import { strings } from '../../helpers';
import {
  ICommandConfig,
  ICommandTransformations
} from '../../common/interfaces';
import { Command as CommandEnums } from '../../common/enums';

interface ICommandsInterpreter {
  setTransformations(transformations: ICommandTransformations): this;
  setInputSequence(inputSequence: string): this;
  hasNotFinishedProcessing(): boolean;
  _getNextCommand({ cachedAmount }: { cachedAmount?: string }): any;
  getNextCommand(): { command: CommandEnums; amount: number };
}

class CommandsInterpreter implements ICommandsInterpreter {
  private pointer: number;
  private inputSequence: string;
  private transformations: ICommandTransformations;

  constructor() {
    this.pointer = 0;
    this.inputSequence = null;
    this.transformations = null;
  }

  static createInstance() {
    return new CommandsInterpreter();
  }

  setTransformations(transformations: ICommandTransformations) {
    this.transformations = transformations;

    return this;
  }

  setInputSequence(inputSequence: string) {
    this.inputSequence = inputSequence;

    return this;
  }

  hasNotFinishedProcessing() {
    return this.inputSequence.length !== this.pointer;
  }

  _getNextCommand({ cachedAmount }: { cachedAmount?: string } = {}): any {
    const commandInput = this.inputSequence[this.pointer];

    if (strings.isNormalNumeric(commandInput)) {
      this.pointer++;
      return this._getNextCommand({ cachedAmount: commandInput });
    }

    this.pointer++;
    const commandInputPrefix = cachedAmount ? 'x' : '';

    return this.transformations[`${commandInputPrefix}${commandInput}`].map(
      ({ command, amount }: ICommandConfig) => {
        if (amount === 'x') {
          return { command, amount: parseInt(cachedAmount) };
        }

        return { command, amount };
      }
    );
  }

  getNextCommand() {
    return this._getNextCommand();
  }
}

export default CommandsInterpreter;

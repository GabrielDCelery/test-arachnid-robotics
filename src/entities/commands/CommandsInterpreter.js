const { strings } = require('../../helpers');

class CommandsInterpreter {
  constructor() {
    this.pointer = 0;
    this.inputSequence = null;
    this.transformations = null;
  }

  static createInstance() {
    return new CommandsInterpreter();
  }

  setTransformations(transformations) {
    this.transformations = transformations;

    return this;
  }

  setInputSequence(inputSequence) {
    this.inputSequence = inputSequence;

    return this;
  }

  hasNotFinishedProcessing() {
    return this.inputSequence.length !== this.pointer;
  }

  _getNextCommand({ cachedAmount }) {
    const commandInput = this.inputSequence[this.pointer];

    if (strings.isNormalNumeric(commandInput)) {
      this.pointer++;
      return this._getNextCommand({ cachedAmount: commandInput });
    }

    this.pointer++;
    const commandInputPrefix = cachedAmount ? 'x' : '';

    return this.transformations[`${commandInputPrefix}${commandInput}`].map(
      ({ command, amount }) => {
        if (amount === 'x') {
          return { command, amount: parseInt(cachedAmount) };
        }

        return { command, amount };
      }
    );
  }

  getNextCommand() {
    return this._getNextCommand({});
  }
}

module.exports = CommandsInterpreter;

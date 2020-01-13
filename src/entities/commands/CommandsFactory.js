const { COMMANDS_ANALYSER, COMMANDS_INTERPRETER } = require('../../constants');

const CommandsAnalyser = require('./CommandsAnalyser');
const CommandsInterpreter = require('./CommandsInterpreter');

class CommandsFactory {
  constructor() {
    this.commands = {
      [COMMANDS_ANALYSER]: new CommandsAnalyser(),
      [COMMANDS_INTERPRETER]: new CommandsInterpreter()
    };
  }

  static createInstance() {
    return new CommandsFactory();
  }

  get(commandsType) {
    return this.commands[commandsType];
  }
}

module.exports = CommandsFactory;

const commands = require('./commands');
const engines = require('./engines');
const fuelTanks = require('./fuelTanks');
const sensors = require('./sensors');
const states = require('./states');

module.exports = {
  ...commands,
  ...engines,
  ...fuelTanks,
  ...sensors,
  ...states
};

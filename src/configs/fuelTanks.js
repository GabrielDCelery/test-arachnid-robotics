const { FUEL_TANK_BASIC, FUEL_TANK_NONE } = require('../constants');

module.exports = {
  [FUEL_TANK_NONE]: {
    amount: 0
  },
  [FUEL_TANK_BASIC]: {
    amount: 30
  }
};

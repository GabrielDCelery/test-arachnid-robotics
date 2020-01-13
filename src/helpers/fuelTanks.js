const config = require('../configs');

class FuelTanks {
  getAmount({ type }) {
    return config['fuelTanks'][type]['amount'];
  }
}

module.exports = new FuelTanks();

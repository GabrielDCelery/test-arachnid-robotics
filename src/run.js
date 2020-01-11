const Robot = require('./entities/Robot');

const run = processConfig => {
  return Robot.createInstance()
    .setVersion(processConfig['robot']['version'])
    .setSurface(processConfig['testSurface'])
    .processInput(processConfig['robot']['inputString'])
    .getCoordinates();
};

module.exports = run;

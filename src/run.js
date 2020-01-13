const App = require('./entities/App');

const run = processConfig => {
  return App.createInstance()
    .setVersion(processConfig['robot']['version'])
    .setTerrain(processConfig['terrain'])
    .processInput(processConfig['robot']['inputString'])
    .getCoordinates();
};

module.exports = run;

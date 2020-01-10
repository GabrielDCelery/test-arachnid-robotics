const Robot = require('./entities/Robot');
const TestChamber = require('./entities/TestChamber');

const run = processConfig => {
  const testChamber = TestChamber.createInstance({
    sizeX: processConfig['testChamber']['sizeX'],
    sizeY: processConfig['testChamber']['sizeY']
  });

  const robot = Robot.createInstance()
    .setTestChamber(testChamber)
    .processInput(processConfig['robot']['inputString']);

  return robot.getCurrentLocation();
};

module.exports = run;

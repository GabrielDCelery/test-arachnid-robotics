const run = require('../src/run');

const result1 = run({
  testChamber: {
    sizeX: 10,
    sizeY: 10
  },
  robot: {
    inputString: '0,0,FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF'
  }
});

console.log(`The robot is at ${JSON.stringify(result1)}`);

const result2 = run({
  testChamber: {
    sizeX: 10,
    sizeY: 10
  },
  robot: {
    inputString: '3,6,FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF'
  }
});

console.log(`The robot is at ${JSON.stringify(result2)}`);

const result3 = run({
  testChamber: {
    sizeX: 10,
    sizeY: 10
  },
  robot: {
    inputString: '0,7,RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR'
  }
});

console.log(`The robot is at ${JSON.stringify(result3)}`);

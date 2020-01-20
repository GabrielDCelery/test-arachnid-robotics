const run = require('../dist/run');

const result1 = run({
  terrain: {
    sizeX: 20,
    sizeY: 20
  },
  robot: {
    version: 'mk3',
    inputString: '0,0,FFFFFF3FLFFFFFFR5FL'
  }
});

console.log(`The robot is at ${JSON.stringify(result1)}`);

const result2 = run({
  terrain: {
    sizeX: 20,
    sizeY: 20
  },
  robot: {
    version: 'mk3',
    inputString: '4,3,FFFFFFFF5FRFFFFFF3FRFFFFFFLFFFFF5FFF5FFFFFFFLFFFFF'
  }
});

console.log(`The robot is at ${JSON.stringify(result2)}`);

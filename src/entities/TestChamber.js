const { FORWARDS, BACKWARDS, LEFT, RIGHT } = require('../constants');

class TestChamber {
  constructor({ sizeX, sizeY }) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.boundaries = {
      left: 0,
      top: this.sizeY - 1,
      right: this.sizeX - 1,
      bottom: 0
    };
  }

  static get DIRECTIONS() {
    return {
      [FORWARDS]: { x: 0, y: 1 },
      [BACKWARDS]: { x: 0, y: -1 },
      [LEFT]: { x: -1, y: 0 },
      [RIGHT]: { x: 1, y: 0 }
    };
  }

  static createInstance({ sizeX, sizeY }) {
    return new TestChamber({ sizeX, sizeY });
  }

  _areCoordinatesInsideBoundaries({ x, y }) {
    return (
      this.boundaries.left <= x &&
      x <= this.boundaries.right &&
      this.boundaries.bottom <= y &&
      y <= this.boundaries.top
    );
  }

  getCoordinatesTowardsDirection({ x, y, direction }) {
    const newX = x + TestChamber['DIRECTIONS'][direction]['x'];
    const newY = y + TestChamber['DIRECTIONS'][direction]['y'];

    const bAreCoordinatesInsideBoundaries = this._areCoordinatesInsideBoundaries(
      {
        x: newX,
        y: newY
      }
    );

    return bAreCoordinatesInsideBoundaries ? { x: newX, y: newY } : { x, y };
  }
}

module.exports = TestChamber;

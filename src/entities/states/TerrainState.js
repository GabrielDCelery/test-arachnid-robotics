class TerrainState {
  setSize({ sizeX, sizeY }) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.boundaries = {
      left: 0,
      top: this.sizeY - 1,
      right: this.sizeX - 1,
      bottom: 0
    };
  }

  areCoordinatesInsideBoundaries({ x, y }) {
    return (
      this.boundaries.left <= x &&
      x <= this.boundaries.right &&
      this.boundaries.bottom <= y &&
      y <= this.boundaries.top
    );
  }
}

module.exports = TerrainState;

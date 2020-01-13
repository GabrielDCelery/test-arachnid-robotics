class Grid {
  getDistanceBetweenCoordinates({ coordinatesOne, coordinatesTwo }) {
    const distX = coordinatesOne.x - coordinatesTwo.x;
    const distY = coordinatesOne.y - coordinatesTwo.y;

    return Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
  }

  multiplyVector({ direction, amount }) {
    return {
      x: amount * direction.x,
      y: amount * direction.y
    };
  }

  calculateNewCoordinatesTowardsDirection({ coordinates, direction }) {
    return {
      x: coordinates.x + direction.x,
      y: coordinates.y + direction.y
    };
  }

  rotateVector({ x, y, degrees }) {
    const radian = (degrees * Math.PI) / 180;
    const cos = parseFloat(Math.cos(radian).toFixed(2));
    const sin = parseFloat(Math.sin(radian).toFixed(2));
    const newX = x * cos - y * sin;
    const newY = x * sin + y * cos;

    return {
      x: newX === -0 ? 0 : newX,
      y: newY === -0 ? 0 : newY
    };
  }
}

module.exports = new Grid();

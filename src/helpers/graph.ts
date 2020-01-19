import { ICoordinates, ISize, IVector } from '../common/interfaces';

const getDistanceBetweenCoordinates = ({
  coordinatesOne,
  coordinatesTwo
}: {
  coordinatesOne: ICoordinates;
  coordinatesTwo: ICoordinates;
}): number => {
  const distX = coordinatesOne.x - coordinatesTwo.x;
  const distY = coordinatesOne.y - coordinatesTwo.y;

  return Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
};

const multiplyVector = ({
  direction,
  amount
}: {
  direction: IVector;
  amount: number;
}): IVector => {
  return {
    x: amount * direction.x,
    y: amount * direction.y
  };
};

const calculateNewCoordinatesTowardsDirection = ({
  coordinates,
  direction
}: {
  coordinates: ICoordinates;
  direction: IVector;
}): ICoordinates => {
  return {
    x: coordinates.x + direction.x,
    y: coordinates.y + direction.y
  };
};

const rotateVector = ({
  direction,
  degrees
}: {
  direction: IVector;
  degrees: number;
}): IVector => {
  const { x, y } = direction;
  const radian = (degrees * Math.PI) / 180;
  const cos = parseFloat(Math.cos(radian).toFixed(2));
  const sin = parseFloat(Math.sin(radian).toFixed(2));
  const newX = x * cos - y * sin;
  const newY = x * sin + y * cos;

  return {
    x: newX === -0 ? 0 : newX,
    y: newY === -0 ? 0 : newY
  };
};

const areCoordinatesInsideBoundaries = ({
  size,
  coordinates
}: {
  size: ISize;
  coordinates: ICoordinates;
}) => {
  const { sizeX, sizeY } = size;
  const { x, y } = coordinates;
  return 0 <= x && x <= sizeX - 1 && 0 <= y && y <= sizeY - 1;
};

export default {
  areCoordinatesInsideBoundaries,
  calculateNewCoordinatesTowardsDirection,
  getDistanceBetweenCoordinates,
  multiplyVector,
  rotateVector
};

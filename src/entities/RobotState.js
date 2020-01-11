const {
  COMMAND_STAY_IN_PLACE,
  COMMAND_MOVE_FORWARDS,
  COMMAND_MOVE_BACKWARDS,
  COMMAND_MOVE_RIGHT,
  COMMAND_MOVE_LEFT,
  COMMAND_TURN_LEFT,
  COMMAND_TURN_RIGHT,
  COMMAND_TURN_BACK
} = require('../constants');

class RobotState {
  constructor() {
    this.coordinates = { x: null, y: null };
    this.direction = { x: null, y: null };
  }

  static createInstance() {
    return new RobotState();
  }

  static _calculateNewCoordinates({ coordinates, direction }) {
    return {
      x: coordinates.x + direction.x,
      y: coordinates.y + direction.y
    };
  }

  static _rotateVector({ x, y, degrees }) {
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

  getCoordinates() {
    return JSON.parse(JSON.stringify(this.coordinates));
  }

  getDirection() {
    return JSON.parse(JSON.stringify(this.direction));
  }

  setCoordinates({ x = 0, y = 0 }) {
    this.coordinates = { x, y };

    return this;
  }

  setDirection({ x = 0, y = 1 }) {
    this.direction = { x, y };

    return this;
  }

  getFallbackCommand() {
    return COMMAND_STAY_IN_PLACE;
  }

  getNewState({ command }) {
    switch (command) {
      case COMMAND_STAY_IN_PLACE: {
        return {
          coordinates: this.coordinates,
          direction: this.direction
        };
      }
      case COMMAND_MOVE_FORWARDS: {
        return {
          coordinates: RobotState._calculateNewCoordinates({
            coordinates: this.coordinates,
            direction: this.direction
          }),
          direction: this.direction
        };
      }
      case COMMAND_MOVE_BACKWARDS: {
        const moveToDirection = RobotState._rotateVector({
          x: this.direction.x,
          y: this.direction.y,
          degrees: 180
        });

        return {
          coordinates: RobotState._calculateNewCoordinates({
            coordinates: this.coordinates,
            direction: moveToDirection
          }),
          direction: this.direction
        };
      }
      case COMMAND_MOVE_LEFT: {
        const moveToDirection = RobotState._rotateVector({
          x: this.direction.x,
          y: this.direction.y,
          degrees: 90
        });

        return {
          coordinates: RobotState._calculateNewCoordinates({
            coordinates: this.coordinates,
            direction: moveToDirection
          }),
          direction: this.direction
        };
      }
      case COMMAND_MOVE_RIGHT: {
        const moveToDirection = RobotState._rotateVector({
          x: this.direction.x,
          y: this.direction.y,
          degrees: -90
        });

        return {
          coordinates: RobotState._calculateNewCoordinates({
            coordinates: this.coordinates,
            direction: moveToDirection
          }),
          direction: this.direction
        };
      }
      case COMMAND_TURN_LEFT: {
        const newDirection = RobotState._rotateVector({
          x: this.direction.x,
          y: this.direction.y,
          degrees: 90
        });

        return {
          coordinates: this.coordinates,
          direction: newDirection
        };
      }
      case COMMAND_TURN_RIGHT: {
        const newDirection = RobotState._rotateVector({
          x: this.direction.x,
          y: this.direction.y,
          degrees: -90
        });

        return {
          coordinates: this.coordinates,
          direction: newDirection
        };
      }
      case COMMAND_TURN_BACK: {
        const newDirection = RobotState._rotateVector({
          x: this.direction.x,
          y: this.direction.y,
          degrees: 180
        });

        return {
          coordinates: this.coordinates,
          direction: newDirection
        };
      }
      default: {
        throw new Error(`Invalid command for robot ${command}`);
      }
    }
  }
}

module.exports = RobotState;

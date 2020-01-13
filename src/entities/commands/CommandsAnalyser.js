const {
  COMMAND_STAY_IN_PLACE,
  COMMAND_MOVE_FORWARDS,
  COMMAND_MOVE_BACKWARDS,
  COMMAND_MOVE_RIGHT,
  COMMAND_MOVE_LEFT,
  COMMAND_TURN_LEFT,
  COMMAND_TURN_RIGHT
} = require('../../constants');
const { graph } = require('../../helpers');

class CommandsAnalyser {
  static createInstance() {
    return new CommandsAnalyser();
  }

  getDesiredPosition({ coordinates, direction, command, amount }) {
    switch (command) {
      case COMMAND_STAY_IN_PLACE: {
        return { coordinates, direction, distance: 0 };
      }

      case COMMAND_MOVE_FORWARDS: {
        const newCoordinates = graph.calculateNewCoordinatesTowardsDirection({
          coordinates,
          direction: graph.multiplyVector({ direction, amount })
        });

        return {
          coordinates: newCoordinates,
          direction,
          distance: amount
        };
      }

      case COMMAND_MOVE_BACKWARDS: {
        const newDirection = graph.rotateVector({
          x: direction.x,
          y: direction.y,
          degrees: 180
        });
        const newCoordinates = graph.calculateNewCoordinatesTowardsDirection({
          coordinates,
          direction: graph.multiplyVector({ direction: newDirection, amount })
        });

        return { coordinates: newCoordinates, direction, distance: amount };
      }

      case COMMAND_MOVE_LEFT: {
        const newDirection = graph.rotateVector({
          x: direction.x,
          y: direction.y,
          degrees: 90
        });
        const newCoordinates = graph.calculateNewCoordinatesTowardsDirection({
          coordinates,
          direction: graph.multiplyVector({ direction: newDirection, amount })
        });

        return { coordinates: newCoordinates, direction, distance: amount };
      }

      case COMMAND_MOVE_RIGHT: {
        const newDirection = graph.rotateVector({
          x: direction.x,
          y: direction.y,
          degrees: -90
        });
        const newCoordinates = graph.calculateNewCoordinatesTowardsDirection({
          coordinates,
          direction: graph.multiplyVector({ direction: newDirection, amount })
        });

        return { coordinates: newCoordinates, direction, distance: amount };
      }

      case COMMAND_TURN_LEFT: {
        const newDirection = graph.rotateVector({
          x: direction.x,
          y: direction.y,
          degrees: amount
        });

        return { coordinates, direction: newDirection, distance: 0 };
      }

      case COMMAND_TURN_RIGHT: {
        const newDirection = graph.rotateVector({
          x: direction.x,
          y: direction.y,
          degrees: -1 * amount
        });

        return { coordinates, direction: newDirection, distance: 0 };
      }

      default: {
        throw new Error(`Invalid command for robot ${command}`);
      }
    }
  }
}

module.exports = CommandsAnalyser;

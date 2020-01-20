import { Command as CommandEnums } from '../../common/enums';
import { ICoordinates, IVector } from '../../common/interfaces';
import { graph as helperGraph } from '../../helpers';

const {
  COMMAND_STAY_IN_PLACE,
  COMMAND_MOVE_FORWARDS,
  COMMAND_MOVE_BACKWARDS,
  COMMAND_MOVE_RIGHT,
  COMMAND_MOVE_LEFT,
  COMMAND_TURN_LEFT,
  COMMAND_TURN_RIGHT
} = CommandEnums;

interface ICommandsAnalyser {
  getDesiredPosition({
    coordinates,
    direction,
    command,
    amount
  }: {
    coordinates: ICoordinates;
    direction: IVector;
    command: CommandEnums;
    amount: number;
  }): {
    coordinates: ICoordinates;
    direction: IVector;
    distance: number;
  };
}

class CommandsAnalyser implements ICommandsAnalyser {
  static createInstance() {
    return new CommandsAnalyser();
  }

  getDesiredPosition({
    coordinates,
    direction,
    command,
    amount
  }: {
    coordinates: ICoordinates;
    direction: IVector;
    command: CommandEnums;
    amount: number;
  }) {
    switch (command) {
      case COMMAND_STAY_IN_PLACE: {
        return { coordinates, direction, distance: 0 };
      }

      case COMMAND_MOVE_FORWARDS: {
        const newCoordinates = helperGraph.calculateNewCoordinatesTowardsDirection(
          {
            coordinates,
            direction: helperGraph.multiplyVector({ direction, amount })
          }
        );

        return {
          coordinates: newCoordinates,
          direction,
          distance: amount
        };
      }

      case COMMAND_MOVE_BACKWARDS: {
        const newDirection = helperGraph.rotateVector({
          direction,
          degrees: 180
        });
        const newCoordinates = helperGraph.calculateNewCoordinatesTowardsDirection(
          {
            coordinates,
            direction: helperGraph.multiplyVector({
              direction: newDirection,
              amount
            })
          }
        );

        return { coordinates: newCoordinates, direction, distance: amount };
      }

      case COMMAND_MOVE_LEFT: {
        const newDirection = helperGraph.rotateVector({
          direction,
          degrees: 90
        });
        const newCoordinates = helperGraph.calculateNewCoordinatesTowardsDirection(
          {
            coordinates,
            direction: helperGraph.multiplyVector({
              direction: newDirection,
              amount
            })
          }
        );

        return { coordinates: newCoordinates, direction, distance: amount };
      }

      case COMMAND_MOVE_RIGHT: {
        const newDirection = helperGraph.rotateVector({
          direction,
          degrees: -90
        });
        const newCoordinates = helperGraph.calculateNewCoordinatesTowardsDirection(
          {
            coordinates,
            direction: helperGraph.multiplyVector({
              direction: newDirection,
              amount
            })
          }
        );

        return { coordinates: newCoordinates, direction, distance: amount };
      }

      case COMMAND_TURN_LEFT: {
        const newDirection = helperGraph.rotateVector({
          direction,
          degrees: amount
        });

        return { coordinates, direction: newDirection, distance: 0 };
      }

      case COMMAND_TURN_RIGHT: {
        const newDirection = helperGraph.rotateVector({
          direction,
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

export default CommandsAnalyser;

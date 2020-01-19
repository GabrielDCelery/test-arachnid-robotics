import { ICoordinates } from './common/interfaces';
import App from './entities/App';

interface ProcessConfig {
  terrain: {
    sizeX: number;
    sizeY: number;
  };
  robot: {
    version: string;
    inputString: string;
  };
}

const run = (processConfig: ProcessConfig): ICoordinates => {
  return App.createInstance()
    .setVersion(processConfig.robot.version)
    .setTerrain(processConfig.terrain)
    .processInput(processConfig.robot.inputString)
    .getCoordinates();
};

export default run;

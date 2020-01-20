import mk1 from './mk1';
import mk2 from './mk2';
import mk3 from './mk3';

export type iVersions = {
  [key: string]: any;
};

const versions: iVersions = {
  mk1,
  mk2,
  mk3
};

export default versions;

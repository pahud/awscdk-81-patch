import { patchModule } from './patch-module';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const consts = require('../consts.json');
const EXPECTED_VERSION = consts['cdk-version'];

export class Patch {
  public static apply() {
    patchModule('@aws-cdk/lambda-layer-awscli', EXPECTED_VERSION);
    patchModule('@aws-cdk/lambda-layer-kubectl', EXPECTED_VERSION);
  }
}

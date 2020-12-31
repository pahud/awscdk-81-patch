import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

const LOG_PREFIX = 'awscdk-81-patch:';

export function patchModule(module: string, expectedVersion: string) {
  let moduleRoot;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require(module); // ensure the module is loaded
    moduleRoot = require.resolve(module + '/package.json');
  } catch (e) {
    console.error(LOG_PREFIX + `${module} not found. patch skipped`);
    return; // module not in closure
  }

  const pkg = JSON.parse(readFileSync(moduleRoot, 'utf-8'));
  if (pkg.version !== expectedVersion) {
    throw new Error(`this patch only applies to AWS CDK version ${expectedVersion}. got ${pkg.version}`);
  }

  const layerdir = join(dirname(moduleRoot), 'layer');
  const dockerfile = join(layerdir, 'Dockerfile');
  if (!existsSync(layerdir)) {
    mkdirSync(layerdir);
    writeFileSync(dockerfile, '# dummy');
    console.error(LOG_PREFIX + `created ${dockerfile}`);
  } else {
    console.error(LOG_PREFIX + `skipped ${dockerfile}`);
  }
}

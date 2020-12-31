import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

export function patchModule(module: string, expectedVersion: string) {
  let moduleRoot;
  try {
    moduleRoot = require.resolve(module + '/package.json');
  } catch (e) {
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
    console.error(`awscdk-81-patch: created ${dockerfile}`);
  } else {
    console.error(`awscdk-81-patch: skipped ${dockerfile}`);
  }
}

import { existsSync, readFileSync, rmdirSync, unlinkSync } from 'fs';
import { dirname, join } from 'path';
import * as eks from '@aws-cdk/aws-eks';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import { Stack } from '@aws-cdk/core';
import { Patch } from '../src';
import { patchModule } from '../src/patch-module';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const consts = require('../consts.json');
const EXPECTED_VERSION = consts['cdk-version'];
const MODULES: string[] = consts.modules;

beforeEach(() => cleanup());
afterEach(() => cleanup());

test('s3-deployment', () => {
  Patch.apply();

  const stack = new Stack();
  new s3deploy.BucketDeployment(stack, 'MyDeployment', {
    destinationBucket: new s3.Bucket(stack, 'MyBucket'),
    sources: [s3deploy.Source.asset(`${__dirname}`)],
  });
});

test('eks', () => {
  const stack = new Stack();

  Patch.apply();
  new eks.Cluster(stack, 'MyCluster', {
    version: eks.KubernetesVersion.V1_18,
  });
});

test('can safely apply multiple times', () => {
  Patch.apply();
  Patch.apply();
  Patch.apply();
});

describe('patchModule()', () => {
  test('creates a dummy Dockerfile', () => {
    const module = MODULES[1];
    patchModule(module, EXPECTED_VERSION);
    const dockerfile = tryFindDummyDockerfile(module);
    expect(dockerfile).toBeDefined();
    expect(readFileSync(dockerfile!, 'utf8')).toStrictEqual('# dummy');
  });

  test('does not fail if the module is not in the closure', () => {
    patchModule('dummydummy', '1.2.3');
  });

  test('fails if there is a version mismatch', () => {
    expect(() => patchModule(MODULES[0], '1.2.3')).toThrow(/this patch only applies to AWS CDK version 1\.2\.3\. got 1\.81\.0/);
  });
});

function cleanup() {
  MODULES.forEach(module => {
    const dockerfile = tryFindDummyDockerfile(module);
    if (dockerfile) {
      unlinkSync(dockerfile);
      rmdirSync(dirname(dockerfile));
    }

    expect(tryFindDummyDockerfile(module)).toBeUndefined();
  });
}

function tryFindDummyDockerfile(module: string) {
  const moduledir = dirname(require.resolve(join(module, 'package.json')));
  const dockerfile = join(moduledir, 'layer', 'Dockerfile');
  return existsSync(dockerfile) ? dockerfile : undefined;
}

const { JsiiProject } = require('projen');
const consts = require('./consts.json');
const EXPECTED_VERSION = consts['cdk-version'];

const project = new JsiiProject({
  author: 'Elad Ben-Israel',
  authorAddress: 'benisrae@amazon.com',
  name: 'awscdk-81-patch',
  repositoryUrl: 'https://github.com/eladb/awscdk-81-patch.git',

  devDeps: [
    '@aws-cdk/aws-s3-deployment',
    '@aws-cdk/aws-eks',
    '@aws-cdk/aws-s3',
    '@aws-cdk/core',
  ].map(m => `${m}@${EXPECTED_VERSION}`),

  /* JsiiProjectOptions */
  // dotnet: undefined,                                                        /* Publish to NuGet. */
  // java: undefined,                                                          /* Publish to maven. */
  // python: undefined,                                                        /* Publish to pypi. */
});

project.synth();

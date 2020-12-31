const { JsiiProject } = require('projen');
const consts = require('./consts.json');
const EXPECTED_VERSION = consts['cdk-version'];

const project = new JsiiProject({
  author: 'Elad Ben-Israel',
  authorAddress: 'benisrae@amazon.com',
  name: 'awscdk-81-patch',
  repositoryUrl: 'https://github.com/eladb/awscdk-81-patch.git',
  defaultReleaseBranch: 'main',

  devDeps: [
    '@aws-cdk/aws-s3-deployment',
    '@aws-cdk/aws-eks',
    '@aws-cdk/aws-s3',
    '@aws-cdk/core',
  ].map(m => `${m}@${EXPECTED_VERSION}`),

  java: {
    javaPackage: 'com.github.eladb.awscdk81patch',
    mavenGroupId: 'com.github.eladb',
    mavenArtifactId: 'awscdk-81-patch',
  },

  python: {
    distName: 'awscdk-81-patch',
    module: 'awscdk_81_patch',
  },

  dotnet: {
    dotNetNamespace: 'Eladb.AwsCdk81Patch',
    packageId: 'Eladb.AwsCdk81Patch',
  },
});

project.synth();

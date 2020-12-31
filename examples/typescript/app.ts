#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import * as eks from '@aws-cdk/aws-eks';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as s3 from '@aws-cdk/aws-s3';

import { Patch } from 'awscdk-81-patch';
Patch.apply();

export class TestStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3deploy.BucketDeployment(this, 'MyDeployment', {
      destinationBucket: new s3.Bucket(this, 'MyBucket'),
      sources: [
        s3deploy.Source.asset('./asset')
      ]
    });

    new eks.Cluster(this, 'MyCluster', {
      version: eks.KubernetesVersion.V1_18
    });
  }
}

const app = new cdk.App();
new TestStack(app, 'TypescriptStack');

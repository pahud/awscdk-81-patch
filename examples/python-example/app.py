#!/usr/bin/env python3
from aws_cdk import core, aws_s3_deployment, aws_s3, aws_eks

from awscdk_81_patch import Patch
Patch.apply()

class TestStack(core.Stack):

    def __init__(self, scope: core.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        aws_s3_deployment.BucketDeployment(self, 'MyDeployment',
            destination_bucket=aws_s3.Bucket(self, 'MyBucket'),
            sources=[aws_s3_deployment.Source.asset('./asset')]
        )

        aws_eks.Cluster(self, 'MyCluster',
            version=aws_eks.KubernetesVersion.V1_18
        )

app = core.App()
TestStack(app, "play-202012311223")

app.synth()

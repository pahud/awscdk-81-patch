package com.myorg;

import java.util.Collection;
import java.util.Collections;

import software.amazon.awscdk.core.Construct;
import software.amazon.awscdk.core.Stack;
import software.amazon.awscdk.core.StackProps;

import software.amazon.awscdk.services.eks.Cluster;
import software.amazon.awscdk.services.eks.ClusterProps;
import software.amazon.awscdk.services.eks.KubernetesVersion;

import software.amazon.awscdk.services.s3.Bucket;
import software.amazon.awscdk.services.s3.deployment.BucketDeployment;
import software.amazon.awscdk.services.s3.deployment.Source;

public class JavaStack extends Stack {
    public JavaStack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public JavaStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

        new Cluster(this, "MyCluster", ClusterProps.builder().version(KubernetesVersion.V1_18).build());

        Bucket bucket = Bucket.Builder.create(this, "MyBucket").build();
        BucketDeployment.Builder.create(this, "MyDeployment")
            .destinationBucket(bucket)
            .sources(Collections.singletonList(Source.asset("./asset"))).build();
    }
}

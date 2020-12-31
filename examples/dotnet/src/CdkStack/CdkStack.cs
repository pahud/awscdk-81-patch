using Amazon.CDK;
using Amazon.CDK.AWS.EKS;
using Amazon.CDK.AWS.S3.Deployment;
using Amazon.CDK.AWS.S3;

namespace CdkStack
{
    public class CdkStack : Stack
    {
        internal CdkStack(Construct scope, string id, IStackProps props = null) : base(scope, id, props)
        {

            // The code that defines your stack goes here
            Cluster cluster = new Cluster(this, "hello-eks", new ClusterProps {
              Version = KubernetesVersion.V1_18
            });

            var websiteBucket = new Bucket(this, "WebsiteBucket", new BucketProps {
                WebsiteIndexDocument = "index.html",
                PublicReadAccess = true
            });

            new BucketDeployment(this, "DeployWebsite", new BucketDeploymentProps {
                Sources = new [] { Source.Asset("./asset") },
                DestinationBucket = websiteBucket,
                DestinationKeyPrefix = "web/static"
            });

        }
    }
}

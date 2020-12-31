using Amazon.CDK;
using Eladb.AwsCdk81Patch;


namespace CdkStack
{
    sealed class Program
    {
        public static void Main(string[] args)
        {
            Patch.Apply();
            var app = new App();
            new CdkStack(app, "CdkStack");
            app.Synth();
        }
    }
}

# Patch for AWS CDK 1.81.0

The `@aws-cdk/aws-eks` and `@aws-cdk/aws-s3-deployment` modules are broken in
v1.81.0 of the AWS CDK due to a missing file in the npm bundle.

Tracking issue: <https://github.com/aws/aws-cdk/issues/12291>

We apologize for this. Until we are able to release a patch, you can use this
tool to apply a patch to the relevant modules. This patch will only work if you
are using v1.81.0 and will need to get removed in the future.

You can apply this patch in all supported CDK programming languages:

* [JavaScript/TypeScript](#javascripttypescript)
* [Java](#java)
* [Python](#python)
* [.NET](#net)

## JavaScript/TypeScript

> See [example](./examples/typescript).

Install using npm/yarn:

```shell
npm install awscdk-81-patch
```

Add this to your main file (before the `App` construct is created):

```ts
import { Patch } from 'awscdk-81-patch';
Patch.apply();

const app = new cdk.App();
// ....
```

## Python

> See [example](./examples/python).

Add this to your `requirements.txt`:

```txt
awscdk-81-patch
```

Install:

```sh
pip install -r requirements.txt
```

Add this to your `app.py`:

```py
from awscdk_81_patch import Patch
Patch.apply()


app = core.App()
# ...
```

## Java

> See [example](./examples/java).

Add this to your `pom.xml` file:

```xml
<dependencies>

  <dependency>
      <groupId>com.github.eladb</groupId>
      <artifactId>awscdk-81-patch</artifactId>
      <version>LATEST</version>
  </dependency>

</dependencies>
```

Apply first thing in your `main()` method:

```java
import com.github.eladb.awscdk81patch.Patch;

public static void main(final String[] args) { {
  Patch.apply();

  App app = new App();
  // ...
}
```

## .NET

Install this module:

```shell
cd src/MyProject # go to where your .csproj file resides
dotnet add package Eladb.AwsCdk81Patch
```

In `Program.cs`, add this:

```cs
using Eladb.AwsCdk81Patch;

public static void Main(string[] args)
{
    Patch.Apply();

    var app = new App();
    // ...
}
```

## License

Distributed under the [Apache 2.0](./LICENSE) license.

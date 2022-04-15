import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class ZapServiceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaLayer = new LayerVersion(this, 'BackendLayer', {
      code: Code.fromAsset('../api/node_modules'),
      compatibleRuntimes: [Runtime.NODEJS_12_X, Runtime.NODEJS_10_X]
    });

    const zapApiLambda = new Function(this, 'BackendHandler', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset('../api/dist'),
      handler: 'lambda.handler',
      layers: [lambdaLayer],
      environment: {
        NODE_PATH: '$NODE_PATH:/opt'
      }
    });

    const zapApiGateway = new LambdaRestApi(this, 'ZapLambdaApi', {
      handler: zapApiLambda
    });
  }
}

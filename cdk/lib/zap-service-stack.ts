import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import {
  AttributeType,
  BillingMode,
  Table,
  TableClass
} from 'aws-cdk-lib/aws-dynamodb';
import { Code, Function, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class ZapServiceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const zapApiLambda = this.createApiLambda();

    const zapApiGateway = new LambdaRestApi(this, 'ZapLambdaApi', {
      handler: zapApiLambda
    });

    const dynamoDb = this.createDynamoDb();

    dynamoDb.grantFullAccess(zapApiLambda);
  }

  private createDynamoDb(): Table {
    const dynamoDb: Table = new Table(this, 'zaps', {
      tableName: 'zaps',
      partitionKey: {
        name: 'PK',
        type: AttributeType.STRING
      },
      sortKey: {
        name: 'SK',
        type: AttributeType.STRING
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      tableClass: TableClass.STANDARD
    });

    dynamoDb.addGlobalSecondaryIndex({
      indexName: 'GSI1',
      partitionKey: {
        name: 'GSI1PK',
        type: AttributeType.STRING
      },
      sortKey: {
        name: 'GSI1SK',
        type: AttributeType.STRING
      }
    });

    return dynamoDb;
  }

  private createApiLambda(): Function {
    const lambdaLayer = new LayerVersion(this, 'BackendLayer', {
      code: Code.fromAsset('../api/node_modules'),
      compatibleRuntimes: [Runtime.NODEJS_12_X, Runtime.NODEJS_10_X]
    });

    const lambda = new Function(this, 'BackendHandler', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset('../api/dist'),
      handler: 'lambda.handler',
      layers: [lambdaLayer],
      environment: {
        NODE_PATH: '$NODE_PATH:/opt'
      }
    });

    return lambda;
  }
}

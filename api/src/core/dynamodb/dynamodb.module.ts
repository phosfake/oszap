import { Module } from '@nestjs/common';
import { Connection, createConnection } from '@typedorm/core';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { User } from 'src/model/user/user.model';
import { DynamoDBService } from './dynamodb.service';
import { table } from './dynamodb.tables';

const LOCAL_DYNAMODB_CONFIG: ServiceConfigurationOptions = {
  endpoint: 'http://localhost:8000',
  region: 'us-east-1',
  accessKeyId: 'local',
  secretAccessKey: 'local'
};

@Module({
  providers: [
    {
      provide: Connection,
      useFactory: () => {
        console.log('Environment', process.env);
        let dynamoConfig: ServiceConfigurationOptions = undefined;
        // If there's no access key, then we're not in a deployed environment, so use local config
        if (!process.env.AWS_ACCESS_KEY_ID) {
          dynamoConfig = LOCAL_DYNAMODB_CONFIG;
        }
        console.log('Initializing ddb connection', dynamoConfig);
        return createConnection({
          table: table,
          entities: [User],
          documentClient: new DocumentClient(dynamoConfig)
        });
      }
    },
    DynamoDBService
  ],
  exports: [DynamoDBService]
})
export class DynamoDBModule {}

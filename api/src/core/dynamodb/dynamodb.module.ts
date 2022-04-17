import { Module } from '@nestjs/common';
import { Connection, createConnection } from '@typedorm/core';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { User } from 'src/model/user/user.model';
import { DynamoDBService } from './dynamodb.service';
import { table } from './dynamodb.tables';

export const DYNAMODB_CONFIG: ServiceConfigurationOptions = {
  endpoint: process.env.DYNAMODB_HOST || 'http://localhost:8000',
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local'
};

@Module({
  providers: [
    {
      provide: Connection,
      useFactory: () => {
        return createConnection({
          table: table,
          entities: [User],
          documentClient: new DocumentClient(DYNAMODB_CONFIG)
        });
      }
    },
    DynamoDBService
  ],
  exports: [DynamoDBService]
})
export class DynamoDBModule {}

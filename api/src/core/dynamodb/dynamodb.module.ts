import { Module } from '@nestjs/common';
import { Connection, createConnection } from '@typedorm/core';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { User } from 'src/model/user/user.model';
import { DynamoDBService } from './dynamodb.service';
import { table } from './dynamodb.tables';

@Module({
  providers: [
    {
      provide: Connection,
      useFactory: () => {
        return createConnection({
          table: table,
          entities: [User],
          documentClient: new DocumentClient()
        });
      }
    },
    DynamoDBService
  ],
  exports: [DynamoDBService]
})
export class DynamoDBModule {}

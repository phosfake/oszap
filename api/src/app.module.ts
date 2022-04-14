import { Module } from '@nestjs/common';
import { Connection, createConnection } from '@typedorm/core';
import DynamoDB, { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamoDBService } from './core/dynamodb/dynamodb.service';
import { table } from './core/dynamodb/dynamodb.tables';
import { User } from './model/user/user.model';
import { ZapsController } from './zaps/zaps.controller';
import { ZapsService } from './zaps/zaps.service';
import { UsersModule } from './users/users.module';
import { ZapsModule } from './zaps/zaps.module';

export const DYNAMODB_CONFIG: DynamoDB.ClientConfiguration = {
  endpoint: process.env.DYNAMODB_HOST || 'http://localhost:8000',
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local'
};

@Module({
  imports: [UsersModule, ZapsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

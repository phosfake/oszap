import { Module } from '@nestjs/common';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ZapsModule } from './zaps/zaps.module';

@Module({
  imports: [UsersModule, ZapsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

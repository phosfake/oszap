import { Module } from '@nestjs/common';
import { DynamoDBModule } from 'src/core/dynamodb/dynamodb.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DynamoDBModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}

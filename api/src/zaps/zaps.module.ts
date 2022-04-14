import { Module } from '@nestjs/common';
import { DynamoDBModule } from 'src/core/dynamodb/dynamodb.module';
import { ZapsController } from './zaps.controller';
import { ZapsService } from './zaps.service';

@Module({
  imports: [DynamoDBModule],
  controllers: [ZapsController],
  providers: [ZapsService],
  exports: [ZapsService]
})
export class ZapsModule {}

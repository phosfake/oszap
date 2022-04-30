import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from '@typedorm/core';
import { DynamoDBService } from 'src/core/dynamodb/dynamodb.service';
import { MockTypeDORMConnectionFactory } from 'src/core/typedorm/mock-typedorm-connection.factory';
import { ZapsService } from './zaps.service';

describe('ZapsService', () => {
  let service: ZapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: Connection,
          useFactory: MockTypeDORMConnectionFactory.useFactory
        },
        DynamoDBService,
        ZapsService
      ]
    }).compile();

    service = module.get<ZapsService>(ZapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from '@typedorm/core';
import { resetTestConnection } from '@typedorm/testing';
import { firstValueFrom } from 'rxjs';
import { DynamoDBService } from 'src/core/dynamodb/dynamodb.service';
import { DeletionSuccess, FindResult } from 'src/core/typedorm/typedorm.model';
import { MockTypeDORMConnectionFactory } from 'src/core/typedorm/mock-typedorm-connection.factory';
import { UsersService } from './users.service';
import { Zap } from 'src/model/zap/zap.model';
import { ZapTrigger } from 'src/model/zap/zap-trigger.model';
import { DocumentClient, QueryOutput } from 'aws-sdk/clients/dynamodb';

fdescribe('UsersService', () => {
  let service: UsersService;
  let mockDocumentClient: {
    delete?: jest.Mock<any, any>;
    createSet?: jest.Mock<any, any>;
    query?: jest.Mock<any, any>;
    scan?: jest.Mock<any, any>;
  };

  beforeEach(async () => {
    mockDocumentClient = {
      createSet: jest.fn(),
      query: jest.fn(),
      scan: jest.fn(),
      delete: jest.fn()
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: Connection,
          useFactory: () =>
            MockTypeDORMConnectionFactory.useFactory(mockDocumentClient)
        },
        DynamoDBService,
        UsersService
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    resetTestConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('delete', () => {
    it('should construct a reasonable query', async () => {
      const zap: Zap = {
        id: 'test-id',
        name: 'test Zap',
        trigger: new ZapTrigger(),
        states: [],
        actions: [],
        createdOn: undefined
      };
      const mockDelete: DeletionSuccess = {
        success: true
      };
      const mockFind: DocumentClient.QueryOutput = {
        Items: [zap],
        LastEvaluatedKey: null
      };
      mockDocumentClient.query.mockReturnValue({ promise: () => mockFind });
      mockDocumentClient.delete.mockReturnValue({ promise: () => mockDelete });
      const result = await service.delete('test-id');
      expect(mockDocumentClient.query).toBeCalledWith({});
      expect(mockDocumentClient.delete).toBeCalledWith({});
    });
  });
});

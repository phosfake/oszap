import { createTestConnection } from '@typedorm/testing';
import { table } from 'src/core/dynamodb/dynamodb.tables';
import { User } from 'src/model/user/user.model';

export class MockTypeDORMConnectionFactory {
  public static useFactory(mockDocumentClient: {
    delete?: jest.Mock<any, any>;
    createSet?: jest.Mock<any, any>;
    query?: jest.Mock<any, any>;
    scan?: jest.Mock<any, any>;
  }) {
    return createTestConnection({
      entities: [User],
      table: table,
      documentClient: mockDocumentClient,
    });
  }
}

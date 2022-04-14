import { Injectable } from '@nestjs/common';
import { Connection, EntityManager } from '@typedorm/core';

@Injectable()
export class DynamoDBService {
  public entityManager: EntityManager;

  constructor(private dynamoDbConnection: Connection) {
    this.entityManager = this.dynamoDbConnection.entityManager;
  }
}

import { Injectable } from '@nestjs/common';
import { DynamoDBService } from 'src/core/dynamodb/dynamodb.service';
import { Zap } from 'src/model/zap/zap.model';

@Injectable()
export class ZapsService {
  constructor(private dynamoDb: DynamoDBService) {}

  public get(id: string): Promise<Zap> {
    const toGet = new Zap();
    toGet.id = id;
    toGet.name = 'test zap';
    throw 'not implemented';
    //return from(this.dynamoDb.mapper.get<Zap>(toGet));
  }

  public create(zap: Zap): Promise<Zap> {
    return this.dynamoDb.entityManager.create<Zap>(zap);
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { from, map, mergeMap, Observable, tap } from 'rxjs';
import { DynamoDBService } from 'src/core/dynamodb/dynamodb.service';
import { DeletionSuccess, FindResult } from 'src/core/typedorm/typedorm.model';
import { User } from 'src/model/user/user.model';

@Injectable()
export class UsersService {
  constructor(private dynamoDb: DynamoDBService) {}

  public get(id: string): Observable<User> {
    const toGet = new User();
    toGet.id = '6d9255da-3ee0-4748-b441-56bcb644b38b';
    toGet.name = 'test zap';
    throw 'not implemented';
    //return from(this.dynamoDb.mapper.get<Zap>(toGet));
  }

  public async create(user: User): Promise<User> {
    const existingUser = await this.dynamoDb.entityManager.findOne(User, user);
    if (existingUser) {
      throw new BadRequestException('Username taken. Try another username.');
    }
    return this.dynamoDb.entityManager.create<User>(user);
  }

  public async delete(id: string): Promise<DeletionSuccess> {
    const foundUsers = await this.dynamoDb.entityManager.find(
      User,
      {
        id: id
      },
      {
        queryIndex: 'GSI1'
      }
    );

    const userCount = foundUsers.items.length;
    if (userCount > 1) {
      throw new BadRequestException(
        `Failed to delete: More than 1 user found with id ${id}.`
      );
    }
    if (userCount <= 0) {
      throw new NotFoundException(
        `Failed to delete: No user found with id ${id}`
      );
    }

    const user = foundUsers.items[0];

    return this.dynamoDb.entityManager.delete(User, {
      name: user.name
    });
  }
}

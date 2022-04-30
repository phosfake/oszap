import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { DynamoDBService } from 'src/core/dynamodb/dynamodb.service';
import { DeletionSuccess } from 'src/core/typedorm/typedorm.model';
import { User } from 'src/model/user/user.model';

@Injectable()
export class UsersService {
  constructor(private dynamoDb: DynamoDBService) {}

  public async get(id: string): Promise<User> {
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
        `Failed to get: More than 1 user found with id ${id}.`
      );
    }
    if (userCount <= 0) {
      throw new NotFoundException(`Failed to get: No user found with id ${id}`);
    }

    return Promise.resolve(foundUsers.items[0]);
  }

  public async create(user: User): Promise<User> {
    const existingUser = await this.dynamoDb.entityManager.findOne(User, user);
    if (existingUser) {
      throw new BadRequestException('Username taken. Try another username.');
    }
    return this.dynamoDb.entityManager.create<User>(user);
  }

  public async delete(id: string): Promise<DeletionSuccess> {
    const user = await this.get(id);

    return this.dynamoDb.entityManager.delete(User, {
      name: user.name
    });
  }
}

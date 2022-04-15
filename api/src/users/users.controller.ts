import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IsAlphanumeric, IsEmail, IsNotEmpty } from 'class-validator';
import { DeletionSuccess } from 'src/core/typedorm/typedorm.model';
import { User } from 'src/model/user/user.model';
import { UsersService } from './users.service';

export class CreateUserDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

@Controller('users')
export class UsersController {
  constructor(private zapsService: UsersService) {}

  @Get(':id')
  async get(@Param('id') id: string): Promise<User> {
    return this.zapsService.get(id);
  }

  @Post()
  async create(@Body() createUserParams: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.name = createUserParams.name;
    user.email = createUserParams.email;

    return this.zapsService.create(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeletionSuccess> {
    return this.zapsService.delete(id);
  }
}

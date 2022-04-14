import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IsAlphanumeric, IsEmail, IsNotEmpty } from 'class-validator';
import { Observable } from 'rxjs';
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
  get(@Param('id') id: string): Observable<User> {
    return this.zapsService.get(id);
  }

  @Post()
  create(@Body() createUserParams: CreateUserDto): Observable<User> {
    const user: User = new User();
    user.name = createUserParams.name;
    user.email = createUserParams.email;

    return this.zapsService.create(user);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<DeletionSuccess> {
    return this.zapsService.delete(id);
  }
}

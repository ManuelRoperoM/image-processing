import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { ResponseUserDto } from './dto/ResCreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  async create(@Body() createUser: CreateUserDto): Promise<ResponseUserDto> {
    return this.usersService.registerUser(createUser);
  }
}

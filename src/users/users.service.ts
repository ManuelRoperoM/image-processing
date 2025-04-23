import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entitity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dto/ResCreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async registerUser(data: CreateUserDto): Promise<ResponseUserDto> {
    try {
      const existingUser = await this.userRepository.findOneBy({
        email: data.email,
      });
      if (existingUser) {
        throw new BadRequestException('El email ya está registrado');
      }
      const hashPass = await bcrypt.hash(data.password, 10);
      const newUser = this.userRepository.create({
        name: data.name,
        email: data.email,
        age: data.age,
        password: hashPass,
      });
      await this.userRepository.save(newUser);
      return {
        status: 200,
        msge: `${data.email} Creado correctamente`,
      };
    } catch (error) {
      return {
        status: 500,
        msge: error instanceof Error ? error.message : String(error),
      };
    }
  }
}

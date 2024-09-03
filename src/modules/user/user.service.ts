import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/response/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async create(requestUser: CreateUserDto): Promise<UserDto> {
    if (await this.userRepo.findOneBy({ username: requestUser.username })) {
      throw new ConflictException('Conflict');
    }
    requestUser.password = await bcrypt.hash(requestUser.password, 0);
    const user = await this.userRepo.save({
      ...requestUser,
      ...(requestUser.facultyId
        ? {
            faculty: { faculty_id: requestUser.facultyId || undefined },
          }
        : {}),
      ...(requestUser.lecturerId
        ? {
            lecturer: { lecturer_id: requestUser.lecturerId || undefined },
          }
        : {}),
    });

    return new UserDto({ isDefault: false, ...user });
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return this.userRepo.findOne({
      where: { username },
      relations: { faculty: true, lecturer: true },
    });
  }

  async findAll(name?: string): Promise<UserDto[]> {
    const users = await this.userRepo
      .createQueryBuilder('User')
      .leftJoinAndSelect('User.faculty', 'Faculty')
      .leftJoinAndSelect('User.lecturer', 'Lecturer')
      .where(
        name
          ? `unaccent(User.displayName) ilike ('%' || unaccent(:keyword) || '%')`
          : '',
        { keyword: name || '' },
      )
      .orWhere(
        name
          ? `unaccent(User.username) ilike ('%' || unaccent(:keyword) || '%')`
          : '',
        { keyword: name || '' },
      )
      .getMany();
    return users.map((value) => {
      return new UserDto(value);
    });
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.userRepo.findOne({
      where: { user_id: id },
      relations: { faculty: true, lecturer: true },
    });
    return new UserDto(user);
  }

  async update(id: string, userDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOneBy({ user_id: id });
    if (!user) throw new Error('User not found');

    Object.assign(user, userDto);

    if (userDto.password) {
      user.password = await bcrypt.hash(userDto.password, 0);
    }

    const result = await this.userRepo.save({
      ...user,
      ...(userDto.facultyId
        ? {
            faculty: { faculty_id: userDto.facultyId || undefined },
          }
        : {}),
      ...(userDto.lecturerId
        ? {
            lecturer: { lecturer_id: userDto.lecturerId || undefined },
          }
        : {}),
    });
    return new UserDto(result);
  }

  remove(id: string) {
    return this.userRepo.delete({ user_id: id });
  }

  async createDefault(user: UserDto) {
    return this.userRepo.save(user);
  }
}

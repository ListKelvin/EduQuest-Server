import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from './decorator/user.decorator';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Faculty } from '../faculty/entities/faculty.entity';
import { Lecturer } from '../lecturer/entities/lecturer.entity';
import { UserDto } from './dto/response/user.dto';
import { FacultyDto } from '../faculty/dto/faculty.dto';
import { LecturerDto } from '../lecturer/dto/lecturer.dto';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserDto], { name: 'users' })
  findAll(@Args('name', { nullable: true }) name?: string): Promise<UserDto[]> {
    return this.userService.findAll(name);
  }

  @Mutation(() => UserDto)
  registerUser(
    @Args('user')
    user: CreateUserDto,
  ): Promise<UserDto> {
    return this.userService.create(user);
  }

  @Mutation(() => UserDto)
  updateUser(
    @Args('user')
    user: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(user.user_id, user);
  }

  @Mutation(() => Boolean)
  async removeUser(
    @Args('id')
    id: string,
  ): Promise<boolean> {
    await this.userService.remove(id);
    return true;
  }

  @Query(() => UserDto)
  @UseGuards(JwtAuthGuard)
  profile(@CurrentUser() user: UserEntity): UserDto {
    return new UserDto(user);
  }

  @ResolveField(() => FacultyDto, { nullable: true })
  faculty(@Parent() user: UserEntity): FacultyDto {
    return new FacultyDto(user.faculty);
  }

  @ResolveField(() => LecturerDto, { nullable: true })
  lecturer(@Parent() user: UserEntity): LecturerDto {
    return new LecturerDto(user.lecturer);
  }
}

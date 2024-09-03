import { Field, InputType } from '@nestjs/graphql';
import { Role } from '../../enums/role.enum';
import { UserEntity } from '../../entities/user.entity';

@InputType()
export class CreateUserDto {
  @Field(() => Role)
  role?: string;

  @Field(() => String, { nullable: true, defaultValue: '' })
  displayName?: string;

  @Field(() => String)
  username?: string;

  @Field(() => String, { nullable: true })
  facultyId?: string;

  @Field(() => String, { nullable: true })
  lecturerId?: string;

  @Field(() => String)
  password?: string;
}

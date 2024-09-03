import { Field, InputType } from '@nestjs/graphql';
import { Role } from '../../enums/role.enum';

@InputType()
export class UpdateUserDto {
  @Field(() => String, { nullable: false })
  user_id?: string;

  @Field(() => Role, { nullable: true })
  role?: Role;

  @Field(() => String, { nullable: true, defaultValue: '' })
  displayName?: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  facultyId?: string;

  @Field(() => String, { nullable: true })
  lecturerId?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => Date, { nullable: true })
  lastAccess?: Date;
}

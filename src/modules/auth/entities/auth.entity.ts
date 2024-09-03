import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../../user/entities/user.entity';

@ObjectType()
export class AuthEntity extends UserEntity {
  @Field(() => String, { nullable: true })
  access_token?: string;

  @Field({ nullable: true })
  refresh_token?: string;

  @Field(() => Date, { nullable: true })
  accessTokenExpiredDate?: Date;

  @Field(() => Date, { nullable: true })
  refreshTokenExpiredDate?: Date;

  @Field(() => Boolean, { nullable: true })
  isFirstTimeLogin?: boolean;
}

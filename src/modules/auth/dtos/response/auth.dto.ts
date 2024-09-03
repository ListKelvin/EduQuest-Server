// import { Field, ObjectType } from '@nestjs/graphql';
// import { UserEntity } from '../../../user/entities/user.entity';
// import { UserDto } from 'src/modules/user/dto/response/user.dto';
// import { AuthEntity } from '../../entities/auth.entity';

// @ObjectType()
// export class AuthDto {
//   @Field(() => String)
//   access_token: string;

//   @Field(() => UserDto)
//   user: UserDto;

//   constructor(access_token: string, user: UserDto) {
//     this.access_token = access_token;
//     this.user = user;
//   }
// }

import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserDto } from '../../../user/dto/response/user.dto';

@ObjectType()
export class AuthDto extends UserDto {
  @Field({ nullable: true })
  access_token?: string;

  @Field({ nullable: true })
  refresh_token?: string;

  @Field(() => Date, { nullable: true })
  accessTokenExpiredDate?: Date;

  @Field(() => Date, { nullable: true })
  refreshTokenExpiredDate?: Date;

  @Field(() => Boolean, { nullable: true })
  isFirstTimeLogin?: boolean;

  @Field(() => UserDto)
  user: UserDto;

  constructor(data) {
    if (!data) return;
    super(data);
    this.token = data.token;
    this.access_token = data.access_token;
    this.refresh_token = data.refresh_token;
    this.refreshTokenExpiredDate = data.refreshTokenExpiredDate;
    this.isFirstTimeLogin = data.isFirstTimeLogin;
  }
}

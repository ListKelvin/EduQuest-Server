import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class RequestUserDto {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}

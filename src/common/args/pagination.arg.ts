import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  page: number = 0;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  size: number = 10;
}

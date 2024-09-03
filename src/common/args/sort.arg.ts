import { ArgsType, Field, InputType } from '@nestjs/graphql';

export type TSortFieldType = 'name' | 'point' | 'criteria';

@InputType()
export class SortFieldArgs {
  @Field({ nullable: false, defaultValue: 'name' })
  type: TSortFieldType;

  @Field({ nullable: true })
  name?: string;
}

@InputType()
@ArgsType()
export class SortArgs {
  @Field({ nullable: true, defaultValue: {} })
  sortField?: SortFieldArgs;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  isAscending?: boolean;
}

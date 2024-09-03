import { ArgsType, Field } from '@nestjs/graphql';
import { FilterArgs } from './filter.arg';
import { SortArgs } from './sort.arg';
import { PaginationArgs } from './pagination.arg';

@ArgsType()
export class QueryArgs {
  @Field(() => FilterArgs, { nullable: true, defaultValue: {} })
  filter?: FilterArgs;

  @Field(() => PaginationArgs, {
    nullable: true,
    defaultValue: { page: 0, size: 10 },
  })
  pagination?: PaginationArgs;

  @Field(() => SortArgs, { nullable: true, defaultValue: {} })
  sort?: SortArgs;
}

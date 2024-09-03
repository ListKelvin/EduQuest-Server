import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PaginationArgs } from '../args/pagination.arg';

@ObjectType()
export class PaginatedMetaData {
  constructor(options: PaginationArgs, total_item: number) {
    this.page = options.page;
    this.size = options.size;
    this.total_item = total_item;
    this.total_page = Math.floor(total_item / options.size) + 1;
    this.hasNext = !!(options.page < this.total_page - 1);
    this.hasPrev = this.page > 0;
  }

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  size: number;

  @Field(() => Int)
  total_item: number;

  @Field(() => Int)
  total_page: number;

  @Field(() => Boolean)
  hasNext: boolean;

  @Field(() => Boolean)
  hasPrev: boolean;
}

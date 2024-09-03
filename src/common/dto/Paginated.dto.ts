import { Field, ObjectType } from '@nestjs/graphql';
import { PaginatedMetaData } from './PaginatedMeta';
import { PaginationArgs } from '../args/pagination.arg';
import { Type } from '@nestjs/common';

export function Paginated<M>(T: Type<M>) {
  @ObjectType()
  class _Paginated<M> {
    constructor(data: M[], options: PaginationArgs, count: number) {
      this.data = data;
      this.meta = new PaginatedMetaData(options, count);
    }

    @Field(() => [T])
    data: M[];

    @Field()
    meta: PaginatedMetaData;
  }

  return _Paginated<M>;
}

@ObjectType()
export class IPaginated<M> {
  data: M[];
  meta: PaginatedMetaData;
}

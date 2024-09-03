import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/dto/Paginated.dto';

@ObjectType()
export class GroupedPoint {
  @Field(() => Float)
  average_point: number;

  @Field(() => Float, { nullable: true })
  point: number;

  @Field(() => Float, { nullable: true })
  max_point: number;

  @Field(() => Int)
  class_num: number;

  @Field()
  id: string;

  @Field({ nullable: true })
  display_name: string;
}

@ObjectType()
export class PaginatedGroupedPoint extends Paginated(GroupedPoint) {}

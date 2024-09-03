import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CriteriaProperty {
  @Field()
  class_type: string;

  @Field(() => Int)
  num: number;
}

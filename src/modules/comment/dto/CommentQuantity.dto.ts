import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentQuantity {
  @Field()
  type: string;

  @Field(() => Int)
  quantity: number;
}

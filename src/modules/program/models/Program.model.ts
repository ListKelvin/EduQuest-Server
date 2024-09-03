import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Program {
  @Field()
  program: string;
}

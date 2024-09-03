import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Semester {
  @PrimaryColumn()
  @Field(() => String)
  semester_id: string;

  @Column()
  @Field()
  display_name: string;

  @Column()
  @Field({ nullable: true })
  type: string;

  @Column()
  @Field({ nullable: true })
  year: string;
}

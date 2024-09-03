import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Class } from '../../class/entities/class.entity';
import { Criteria } from '../../criteria/entities/criteria.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Point {
  @PrimaryColumn()
  @Field(() => String)
  point_id: string;

  @Column()
  @Field(() => Int)
  max_point: number;

  @Column({ type: 'float' })
  @Field(() => Float)
  point: number;

  @ManyToOne(() => Class)
  @JoinColumn({ name: 'class_id' })
  @Field(() => Class, { nullable: true })
  class: Class;

  @ManyToOne(() => Criteria)
  @JoinColumn({ name: 'criteria_id' })
  @Field(() => Criteria, { nullable: true })
  criteria: Criteria;

  @Column()
  @Field()
  criteria_id: string;
}

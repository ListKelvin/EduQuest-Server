import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Point } from '../../point/entities/point.entity';
import { Semester } from '../../semester/entities/semester.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Criteria {
  @Field()
  @PrimaryColumn()
  criteria_id: string;

  @Field()
  @Column()
  display_name: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  index: number;

  @ManyToOne(() => Semester)
  @JoinColumn({ name: 'semester_id' })
  semester: Semester;

  @Column({ nullable: true })
  semester_id: string;

  @OneToMany(() => Point, (point) => point.criteria)
  points: Point[];
}

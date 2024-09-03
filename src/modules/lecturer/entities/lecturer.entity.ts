import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Class } from '../../class/entities/class.entity';
import { Faculty } from '../../faculty/entities/faculty.entity';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity()
export class Lecturer {
  @PrimaryColumn()
  @Field()
  lecturer_id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  display_name: string;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  mscb: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  faculty_id: string;

  @ManyToOne(() => Faculty, (faculty) => faculty.lecturers)
  @JoinColumn({ name: 'faculty_id' })
  // @Field(() => Faculty, { nullable: true })
  faculty: Faculty;

  @Column({ nullable: true })
  @Field({ nullable: true })
  username: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  learning_position: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  birth_date: Date;

  @Column({ nullable: true })
  @Field(() => Boolean, { nullable: true })
  gender: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  learning: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ngach: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  position: string;

  @OneToMany(() => Class, (class_) => class_.lecturer)
  // @Field(() => [Class], { nullable: true })
  classes: Class[];

  @Field({ nullable: true })
  total_point: number;
}

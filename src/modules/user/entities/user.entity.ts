import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Faculty } from '../../faculty/entities/faculty.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';
import { Lecturer } from '../../lecturer/entities/lecturer.entity';

@ObjectType()
@Entity()
export class UserEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Field(() => Boolean, { defaultValue: true })
  @Column({ type: Boolean, default: true })
  isDefault: boolean;

  @Field(() => Role, { defaultValue: 'LECTURER' })
  @Column({ type: 'enum', enum: Object.values(Role), default: 'LECTURER' })
  role: string;

  @Field(() => String, { defaultValue: '' })
  @Column({ default: '', nullable: true })
  displayName: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  username: string;

  @ManyToOne(() => Faculty, { nullable: true })
  faculty?: Faculty;

  @ManyToOne(() => Lecturer, { nullable: true })
  lecturer?: Lecturer;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  password: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  token: string;

  @Field(() => Date, { nullable: true, defaultValue: new Date() })
  @Column({
    type: 'timestamp with time zone',
    nullable: true,
    default: new Date(),
  })
  lastAccess: Date;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  fullname: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  department: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  firstaccess: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  lastaccess: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  auth: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  suspended: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  confirmed: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  lang: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  theme: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  timezone: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  mailformat: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  city: string;

  @Field(() => String, { nullable: true })
  @Column()
  country: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  profileimageurlsmall: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  profileimageurl: string;

  @Field(() => [UserPreference])
  preferences: UserPreference[];
}

@ObjectType()
export class UserPreference {
  @Field(() => String)
  name: string;

  @Field(() => String)
  value: string;
}

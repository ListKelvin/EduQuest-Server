import { Field, ObjectType } from '@nestjs/graphql';
import { FacultyDto } from 'src/modules/faculty/dto/faculty.dto';
import { Lecturer } from '../entities/lecturer.entity';

@ObjectType()
export class LecturerDto {
  @Field(() => String)
  lecturer_id: string;

  @Field(() => String, { nullable: true })
  display_name: string;

  @Field(() => String, { nullable: true })
  mscb: string;

  @Field(() => String, { nullable: true })
  faculty_id: string;

  @Field(() => FacultyDto, { nullable: true })
  faculty: FacultyDto;

  @Field(() => String, { nullable: true })
  username: string;

  @Field(() => String, { nullable: true })
  learning_position: string;

  @Field(() => Date, { nullable: true })
  birth_date: Date;

  @Field(() => Boolean, { nullable: true })
  gender: boolean;

  @Field(() => String, { nullable: true })
  learning: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String, { nullable: true })
  ngach: string;

  @Field(() => String, { nullable: true })
  position: string;

  @Field(() => Number, { nullable: true })
  total_point: number;

  constructor(entity: Lecturer) {
    if (!entity) return;
    this.lecturer_id = entity.lecturer_id;
    this.display_name = entity.display_name;
    this.mscb = entity.mscb;
    this.faculty_id = entity.faculty_id;
    this.username = entity.username;
    this.learning = entity.learning;
    this.total_point = entity.total_point;
    this.position = entity.position;
    this.ngach = entity.ngach;
    this.phone = entity.phone;
    this.email = entity.email;
    this.faculty = new FacultyDto(entity.faculty);
  }
}

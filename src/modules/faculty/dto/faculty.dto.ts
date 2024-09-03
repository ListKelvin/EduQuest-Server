import { Field, ObjectType } from '@nestjs/graphql';
import {
  GroupedPoint,
  PaginatedGroupedPoint,
} from 'src/modules/point/dto/PaginatedGroupedPoint';
import { Faculty } from '../entities/faculty.entity';

@ObjectType()
export class FacultyDto {
  @Field(() => String)
  faculty_id: string;

  @Field()
  display_name: string;

  @Field({ nullable: true })
  full_name: string;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  is_displayed: boolean;

  // @Field(() => LecturerDto, { nullable: true })
  // lecturers: LecturerDto[];

  // @Field(() => SubjectDto, { nullable: true })
  // subjects: Subject[];

  @Field(() => GroupedPoint, { nullable: true })
  total_point: GroupedPoint;

  @Field(() => PaginatedGroupedPoint, { nullable: true })
  points: PaginatedGroupedPoint;

  constructor(entity: Faculty) {
    if(!entity) return
    this.faculty_id = entity.faculty_id;
    this.display_name = entity.display_name;
    this.full_name = entity.full_name;
    this.is_displayed = entity.is_displayed;
  }
}

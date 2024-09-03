import { Logger } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FilterArgs } from '../../common/args/filter.arg';
import { QueryArgs } from '../../common/args/query.arg';
import { PaginatedLecturer } from '../lecturer/dto/PaginatedLecturer';
import { LecturerService } from '../lecturer/lecturer.service';
import {
  GroupedPoint,
  PaginatedGroupedPoint,
} from '../point/dto/PaginatedGroupedPoint';
import { PointService } from '../point/point.service';
import { PaginatedSubject } from '../subject/dto/PaginatedSubject';
import { SubjectService } from '../subject/subject.service';
import { PaginatedFaculty } from './dto/PaginatedFaculty';
import { Faculty } from './entities/faculty.entity';
import { FacultyService } from './faculty.service';

@Resolver(() => Faculty)
export class FacultyResolver {
  private readonly logger = new Logger(FacultyResolver.name);

  constructor(
    private readonly facultyService: FacultyService,
    private readonly lecturerService: LecturerService,
    private readonly subjectService: SubjectService,
    private readonly pointService: PointService,
  ) {}

  @Query(() => PaginatedFaculty, {
    name: 'faculties',
    description: 'List all faculty available',
  })
  findAll(@Args() { filter, pagination }: QueryArgs) {
    return this.facultyService.findAll(filter, pagination);
  }

  @Query(() => Faculty, {
    name: 'faculty',
    description: 'Get detail information of a faculty and its lecturer list',
    nullable: true,
  })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.facultyService.findOne(id);
  }

  @ResolveField(() => PaginatedLecturer, { nullable: true })
  async lecturers(@Parent() faculty: Faculty, @Args() queryArgs: QueryArgs) {
    return this.lecturerService.findAll({
      ...queryArgs,
      filter: { ...queryArgs.filter, faculty_id: faculty.faculty_id },
    });
  }

  @ResolveField(() => PaginatedSubject, { nullable: true })
  async subjects(@Parent() faculty: Faculty, @Args() queryArgs: QueryArgs) {
    return this.subjectService.findAll({
      ...queryArgs,
      filter: { ...queryArgs.filter, faculty_id: faculty.faculty_id },
    });
  }

  @ResolveField(() => GroupedPoint, { nullable: true })
  async total_point(@Parent() faculty: Faculty, @Args() filter: FilterArgs) {
    const result = await this.pointService.findAll(
      {
        ...filter,
        faculty_id: faculty.faculty_id,
      },
      { page: 0, size: 100 },
      'Faculty',
    );
    return result.data[0];
  }

  @ResolveField(() => PaginatedGroupedPoint, { nullable: true })
  async points(@Parent() faculty: Faculty, @Args() filter: FilterArgs) {
    const result = await this.pointService.findAll(
      {
        ...filter,
        faculty_id: faculty.faculty_id,
      },
      { page: 0, size: 100 },
      'Criteria',
    );
    return result;
  }
}

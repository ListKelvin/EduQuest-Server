import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ClassService } from '../class/class.service';
import { PaginatedClass } from '../class/dto/PaginatedClass';
import { QueryArgs } from '../../common/args/query.arg';
import { Faculty } from '../faculty/entities/faculty.entity';
import { FacultyService } from '../faculty/faculty.service';
import { GroupedPoint } from '../point/dto/PaginatedGroupedPoint';
import { PointService } from '../point/point.service';
import { PaginatedLecturer } from './dto/PaginatedLecturer';
import { Lecturer } from './entities/lecturer.entity';
import { LecturerService } from './lecturer.service';

@Resolver(() => Lecturer)
export class LecturerResolver {
  constructor(
    private readonly lecturerService: LecturerService,
    private readonly pointService: PointService,
    private readonly facultyService: FacultyService,
    private readonly classService: ClassService,
  ) {}

  @Query(() => PaginatedLecturer, {
    name: 'lecturers',
    description: 'List all lecturer',
  })
  findAll(@Args() queryArgs: QueryArgs) {
    return this.lecturerService.findAll(queryArgs);
  }

  @Query(() => Lecturer, {
    name: 'lecturer',
    description: 'View detail information of a specific lecturer',
    nullable: true,
  })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.lecturerService.findOne(id);
  }

  @ResolveField(() => [GroupedPoint])
  async points(@Parent() lecturer: Lecturer, @Args() { filter }: QueryArgs) {
    const { lecturer_id } = lecturer;
    const result = await this.pointService.findAll(
      { ...filter, lecturer_id },
      { size: 100, page: 0 },
      'Criteria',
    );
    return result.data;
  }

  @ResolveField(() => Faculty)
  async faculty(@Parent() lecturer: Lecturer) {
    const { faculty_id } = lecturer;
    return this.facultyService.findOne(faculty_id);
  }

  @ResolveField(() => PaginatedClass)
  async classes(@Parent() lecturer: Lecturer, @Args() queryArgs: QueryArgs) {
    const { lecturer_id } = lecturer;
    const result = await this.classService.findAll({
      ...queryArgs,
      filter: { ...queryArgs.filter, lecturer_id },
    });
    return result;
  }
}

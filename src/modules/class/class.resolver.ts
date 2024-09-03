import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { QueryArgs } from 'src/common/args/query.arg';
import { ClassService } from './class.service';
import { PaginatedClass } from './dto/PaginatedClass';
import { Class } from './entities/class.entity';
import { GroupedPoint } from '../../modules/point/dto/PaginatedGroupedPoint';
import { FilterArgs } from '../../common/args/filter.arg';
import { PointService } from '../../modules/point/point.service';
import { Lecturer } from '../../modules/lecturer/entities/lecturer.entity';
import { LecturerService } from '../../modules/lecturer/lecturer.service';
import { SemesterService } from '../../modules/semester/semester.service';
import { Semester } from '../../modules/semester/entities/semester.entity';
import { Subject } from '../../modules/subject/entities/subject.entity';
import { SubjectService } from '../../modules/subject/subject.service';

@Resolver(() => Class)
export class ClassResolver {
  constructor(
    private readonly classService: ClassService,
    private readonly pointService: PointService,
    private readonly subjectService: SubjectService,
    private readonly semesterService: SemesterService,
    private readonly lecturerService: LecturerService,
  ) {}

  @Query(() => PaginatedClass, {
    name: 'classes',
    description: 'List all classes',
  })
  findAll(@Args() queryArgs: QueryArgs) {
    return this.classService.findAll(queryArgs);
  }

  @Query(() => Class, {
    name: 'class',
    description: 'View particular class information',
    nullable: true,
  })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.classService.findOne(id);
  }

  @ResolveField(() => [GroupedPoint])
  async points(@Parent() classItem: Class, @Args() filter: FilterArgs) {
    const { class_id } = classItem;
    const result = await this.pointService.findAll(
      { ...filter, class_id },
      { size: 100, page: 0 },
      'Criteria',
    );
    return result.data;
  }

  @ResolveField(() => Lecturer)
  async lecturer(@Parent() classItem: Class) {
    const { lecturer_id } = classItem;
    return await this.lecturerService.findOne(lecturer_id);
  }

  @ResolveField(() => Semester)
  async semester(@Parent() classItem: Class) {
    const { semester_id } = classItem;
    return await this.semesterService.findOne(semester_id);
  }

  @ResolveField(() => Subject)
  async subject(@Parent() classItem: Class) {
    const { subject_id } = classItem;
    return this.subjectService.findOne(subject_id);
  }
}

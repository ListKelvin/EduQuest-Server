import { Query, Resolver } from '@nestjs/graphql';
import { Semester } from './entities/semester.entity';
import { SemesterService } from './semester.service';

@Resolver(() => Semester)
export class SemesterResolver {
  constructor(private readonly semesterService: SemesterService) {}

  @Query(() => [Semester], {
    name: 'semesters',
    description: 'List all semester',
    nullable: true,
  })
  findAll() {
    return this.semesterService.findAll();
  }
}

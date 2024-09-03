import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { QueryArgs } from '../../common/args/query.arg';
import { Semester } from '../semester/entities/semester.entity';
import { SemesterService } from '../semester/semester.service';
import { CriteriaService } from './criteria.service';
import { PaginatedCriteria } from './dto/PaginatedCriteria.dto';
import { Criteria } from './entities/criteria.entity';
import { CriteriaProperty } from './dto/CriteriaProperty.dto';

@Resolver(() => Criteria)
export class CriteriaResolver {
  constructor(
    private readonly criteriaService: CriteriaService,
    private readonly semesterService: SemesterService,
  ) {}
  @Query(() => PaginatedCriteria, { name: 'criterias' })
  findAll(@Args() queryArgs: QueryArgs) {
    return this.criteriaService.findAll(queryArgs);
  }

  @Query(() => Criteria, { name: 'criteria', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.criteriaService.findOne(id);
  }

  @ResolveField(() => [Semester])
  async semester(@Parent() criteria: Criteria) {
    return this.semesterService.findByCriteria(criteria.criteria_id);
  }

  @ResolveField(() => [CriteriaProperty])
  async type(@Parent() criteria: Criteria) {
    return this.criteriaService.findClassType(criteria.criteria_id);
  }
}

import { Args, Query, Resolver } from '@nestjs/graphql';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { Point } from './entities/point.entity';
import { PointService } from './point.service';
import { PaginatedGroupedPoint } from './dto/PaginatedGroupedPoint';

@Resolver(() => Point)
export class PointResolver {
  constructor(private readonly pointService: PointService) {}

  @Query(() => PaginatedGroupedPoint, {
    name: 'groupedPoints',
    description: 'List all points, group by a specific entity',
  })
  findAll(
    @Args() filter: FilterArgs,
    @Args() pagination: PaginationArgs,
    @Args('groupEntity', { nullable: true, defaultValue: 'Subject' })
    groupEntity: 'Subject' | 'Lecturer' | 'Faculty',
  ) {
    return this.pointService.findAll(filter, pagination, groupEntity);
  }
}

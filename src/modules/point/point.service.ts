import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { filterQuery } from 'src/common/utils/filterQuery';
import { paginateByQuery } from 'src/common/utils/paginate';
import { Repository } from 'typeorm';
import { Point } from './entities/point.entity';

@Injectable()
export class PointService {
  constructor(@InjectRepository(Point) private repo: Repository<Point>) {}

  findAll(
    filter: FilterArgs,
    paginationOptions: PaginationArgs,
    groupEntity: 'Subject' | 'Lecturer' | 'Faculty' | 'Criteria',
  ) {
    return paginateByQuery(
      filterQuery<Point>(
        'Point',
        this.repo
          .createQueryBuilder()
          .innerJoin('Point.class', 'Class')
          .innerJoin('Class.subject', 'Subject')
          .innerJoin('Class.semester', 'Semester')
          .innerJoin('Point.criteria', 'Criteria')
          .innerJoin('Subject.faculty', 'Faculty')
          .innerJoin('Class.lecturer', 'Lecturer'),
        { ...filter, keyword: '' },
      )
        .select('AVG(Point.point / Point.max_point)', 'average_point')
        .addSelect('AVG(Point.point)', 'point')
        .addSelect('AVG(Point.max_point)', 'max_point')
        .addSelect(`COUNT(DISTINCT(Class.class_id))`, 'class_num')
        .addSelect(`${groupEntity}.display_name`, 'display_name')
        .addSelect(`${groupEntity}.${groupEntity.toLowerCase()}_id`, 'id')
        .andWhere('Point.max_point != 0')
        .groupBy(`${groupEntity}.${groupEntity.toLowerCase()}_id`),
      paginationOptions,
      filter,
      { isRaw: true },
    );
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from '../../modules/class/entities/class.entity';
import { QueryArgs } from '../../common/args/query.arg';
import { BaseService } from '../../common/services/BaseService';
import { filterQuery } from '../../common/utils/filterQuery';
import { paginateByQuery } from '../../common/utils/paginate';
import { Point } from '../../modules/point/entities/point.entity';
import { FindOptionsRelations, Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectService extends BaseService<Subject> {
  constructor(@InjectRepository(Subject) private repo: Repository<Subject>) {
    super();
  }

  relations: FindOptionsRelations<Subject> = { faculty: true };

  async findAll({ filter, sort, pagination: paginationOptions }: QueryArgs) {
    return paginateByQuery(
      filterQuery<Subject>(
        Subject,
        this.repo
          .createQueryBuilder()
          .leftJoin(Class, 'Class', 'Class.subject_id = Subject.subject_id')
          .leftJoin(Point, 'Point', 'Point.class_id = Class.class_id')
          .leftJoin('Subject.faculty', 'Faculty')
          .leftJoin('Class.semester', 'Semester')
          .innerJoin('Class.lecturer', 'Lecturer'),
        filter,
        sort,
      )
        .select('Subject.subject_id', 'subject_id')
        .addSelect('Subject.display_name', 'display_name')
        .addSelect('Subject.faculty_id', 'faculty_id')
        .addSelect('AVG(Point.point / Point.max_point)', 'total_point')
        .andWhere('Point.max_point != 0')
        .addGroupBy('Subject.subject_id'),
      paginationOptions,
      filter,
      { isRaw: true },
    );
  }

  findOne(id: string): Promise<Subject> {
    return this.repo.findOne({
      where: { subject_id: id },
    });
  }
}

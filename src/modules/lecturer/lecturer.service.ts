import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryArgs } from 'src/common/args/query.arg';
import { BaseService } from 'src/common/services/BaseService';
import { filterQuery } from 'src/common/utils/filterQuery';
import { paginateByQuery } from 'src/common/utils/paginate';
import { FindOptionsRelations, Repository } from 'typeorm';
import { Lecturer } from './entities/lecturer.entity';

@Injectable()
export class LecturerService extends BaseService<Lecturer> {
  constructor(@InjectRepository(Lecturer) private repo: Repository<Lecturer>) {
    super();
  }

  relations: FindOptionsRelations<Lecturer> = {
    faculty: true,
  };

  async findAll({ filter, pagination, sort }: QueryArgs) {
    return paginateByQuery(
      filterQuery<Lecturer>(
        Lecturer,
        this.repo
          .createQueryBuilder()
          .leftJoin('Lecturer.classes', 'Class')
          .leftJoin('Class.points', 'Point')
          .leftJoin('Class.subject', 'Subject')
          .leftJoin('Subject.faculty', 'Faculty')
          .leftJoin('Class.semester', 'Semester'),
        filter,
        sort,
      )
        .select('Lecturer.lecturer_id', 'lecturer_id')
        .addSelect('Lecturer.display_name', 'display_name')
        .addSelect('Lecturer.email', 'email')
        .addSelect('Lecturer.birth_date', 'birth_date')
        .addSelect('Lecturer.faculty_id', 'faculty_id')
        .addSelect('Lecturer.gender', 'gender')
        .addSelect('Lecturer.learning', 'learning')
        .addSelect('Lecturer.learning_position', 'learning_position')
        .addSelect('Lecturer.mscb', 'mscb')
        .addSelect('Lecturer.ngach', 'ngach')
        .addSelect('Lecturer.phone', 'phone')
        .addSelect('Lecturer.position', 'position')
        .addSelect('Lecturer.username', 'username')
        .addSelect('AVG(Point.point / Point.max_point)', 'total_point')
        .andWhere('Point.max_point != 0')
        .addGroupBy('Lecturer.lecturer_id'),
      pagination,
      filter,
      { isRaw: true },
    );
  }

  findOne(id: string): Promise<Lecturer> {
    return this.repo.findOne({ where: { lecturer_id: id } });
  }
}

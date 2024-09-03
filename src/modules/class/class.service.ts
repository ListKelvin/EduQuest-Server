import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryArgs } from 'src/common/args/query.arg';
import { BaseService } from 'src/common/services/BaseService';
import { filterQuery } from 'src/common/utils/filterQuery';
import { paginateByQuery } from 'src/common/utils/paginate';
import { FindOptionsRelations, Repository } from 'typeorm';
import { Class } from './entities/class.entity';

@Injectable()
export class ClassService extends BaseService<Class> {
  constructor(@InjectRepository(Class) private repo: Repository<Class>) {
    super();
  }

  relations: FindOptionsRelations<Class> = {
    lecturer: true,
    semester: true,
    subject: {
      faculty: true,
    },
  };

  async findAll({ filter, sort, pagination }: QueryArgs) {
    return paginateByQuery(
      filterQuery<Class>(
        'Class',
        this.repo
          .createQueryBuilder()
          .leftJoin('Class.subject', 'Subject')
          .leftJoin('Class.lecturer', 'Lecturer')
          .leftJoin('Lecturer.faculty', 'Faculty')
          .leftJoin('Class.points', 'Point')
          .leftJoin('Class.semester', 'Semester'),
        filter,
        sort,
      ),
      pagination,
      filter,
      {},
    );
  }

  findOne(id: string): Promise<Class> {
    return this.repo.findOne({
      where: { class_id: id },
    });
  }
}

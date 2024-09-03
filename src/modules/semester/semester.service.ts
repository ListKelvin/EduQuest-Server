import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Semester } from './entities/semester.entity';

@Injectable()
export class SemesterService {
  constructor(@InjectRepository(Semester) private repo: Repository<Semester>) {}

  async findAll() {
    return (await this.repo.find()).reverse();
  }

  async findOne(id: string) {
    return this.repo.findOne({ where: { semester_id: id } });
  }

  async findByCriteria(criteria_id: string): Promise<Semester[]> {
    return this.repo
      .createQueryBuilder()
      .leftJoin('Class', 'Class', 'Class.semester_id = Semester.semester_id')
      .leftJoin('Class.points', 'Point')
      .leftJoin('Point.criteria', 'Criteria')
      .where('Point.criteria_id = :criteria_id', { criteria_id })
      .groupBy('Semester.semester_id')
      .getMany();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from '../../modules/class/entities/class.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramService {
  constructor(@InjectRepository(Class) private repo: Repository<Class>) {}

  async findAll() {
    const result = await this.repo
      .createQueryBuilder('class')
      .select('program')
      .groupBy('program')
      .execute();
    return result;
  }
}

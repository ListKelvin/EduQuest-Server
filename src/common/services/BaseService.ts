import { FindOptionsRelations } from 'typeorm';

export abstract class BaseService<T> {
  abstract relations: FindOptionsRelations<T>;
}

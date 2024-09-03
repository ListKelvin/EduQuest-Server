import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/dto/Paginated.dto';
import { Class } from '../entities/class.entity';

@ObjectType()
export class PaginatedClass extends Paginated(Class) {}

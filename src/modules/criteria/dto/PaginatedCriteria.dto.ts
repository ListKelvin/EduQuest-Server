import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/dto/Paginated.dto';
import { Criteria } from '../entities/criteria.entity';

@ObjectType()
export class PaginatedCriteria extends Paginated(Criteria) {}

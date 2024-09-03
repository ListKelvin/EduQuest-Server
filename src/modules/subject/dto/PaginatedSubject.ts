import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/dto/Paginated.dto';
import { Subject } from '../entities/subject.entity';

@ObjectType()
export class PaginatedSubject extends Paginated(Subject) {}

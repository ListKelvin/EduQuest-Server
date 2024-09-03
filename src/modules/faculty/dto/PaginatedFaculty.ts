import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/dto/Paginated.dto';
import { Faculty } from '../entities/faculty.entity';

@ObjectType()
export class PaginatedFaculty extends Paginated(Faculty) {}

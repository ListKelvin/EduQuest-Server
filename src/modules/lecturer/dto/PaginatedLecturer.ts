import { Paginated } from 'src/common/dto/Paginated.dto';
import { Lecturer } from '../entities/lecturer.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatedLecturer extends Paginated(Lecturer) {}

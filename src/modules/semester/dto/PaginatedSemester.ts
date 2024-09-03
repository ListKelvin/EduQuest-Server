import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/dto/Paginated.dto';
import { Semester } from '../entities/semester.entity';

@ObjectType()
export class PaginatedSemester extends Paginated(Semester) {}

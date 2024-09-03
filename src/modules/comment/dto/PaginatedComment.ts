import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/dto/Paginated.dto';
import { Comment } from '../entities/comment.entity';

@ObjectType()
export class PaginatedComment extends Paginated(Comment) {}

import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryArgs } from 'src/common/args/query.arg';
import { CommentService } from './comment.service';
import { CommentQuantity } from './dto/CommentQuantity.dto';
import { PaginatedComment } from './dto/PaginatedComment';
import { Comment } from './entities/comment.entity';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => PaginatedComment, {
    name: 'comments',
    description: 'List all comments',
  })
  findAll(
    @Args() { filter, pagination }: QueryArgs,
    @Args('type', { nullable: true }) type: string,
  ) {
    return this.commentService.findAll(filter, pagination, type);
  }

  @Query(() => CommentQuantity, { name: 'commentQuantity' })
  commenQuantity(
    @Args() { filter }: QueryArgs,
    @Args('type', { nullable: true }) type: string,
  ) {
    return this.commentService.getQuantity(filter, type);
  }

  @Query(() => Comment, {
    name: 'comment',
    description: 'View particular comment information',
    nullable: true,
  })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.commentService.findOne(id);
  }
}

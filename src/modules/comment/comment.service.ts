import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterArgs } from 'src/common/args/filter.arg';
import { PaginationArgs } from 'src/common/args/pagination.arg';
import { filterQuery } from 'src/common/utils/filterQuery';
import { paginateByQuery } from 'src/common/utils/paginate';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

  findAll(filter: FilterArgs, paginationOptions: PaginationArgs, type: string) {
    return paginateByQuery(
      filterQuery<Comment>(
        'Comment',
        this.repo
          .createQueryBuilder()
          .innerJoin('Comment.class', 'Class')
          .innerJoin('Class.subject', 'Subject')
          .innerJoin('Subject.faculty', 'Faculty')
          .innerJoin('Class.semester', 'Semester')
          .innerJoin('Class.lecturer', 'Lecturer'),
        filter,
      ).andWhere(type && type != 'all' ? 'Comment.type = :type' : 'true', {
        type,
      }),
      paginationOptions,
      filter,
      {
        relations: {
          class: true,
        },
      },
    );
  }

  async getQuantity(filter: FilterArgs, type: string) {
    return {
      type: type ?? 'all',
      quantity:
        (await filterQuery<Comment>(
          'Comment',
          this.repo
            .createQueryBuilder()
            .innerJoin('Comment.class', 'Class')
            .innerJoin('Class.subject', 'Subject')
            .innerJoin('Subject.faculty', 'Faculty')
            .innerJoin('Class.semester', 'Semester')
            .innerJoin('Class.lecturer', 'Lecturer'),
          filter,
        )
          .andWhere(type && type != 'all' ? 'Comment.type = :type' : 'true', {
            type,
          })
          .getCount()) || 0,
    };
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { comment_id: id }, relations: {} });
  }
}

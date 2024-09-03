import { ArgsType, Field } from '@nestjs/graphql';
import { IFilterField, ISort } from 'src/common/types/common.type';

@ArgsType()
export class FindAllArgs {
  @Field({ nullable: true, defaultValue: 'ASC' })
  sort: ISort;

  @Field({ nullable: true })
  filter_field: IFilterField;
}

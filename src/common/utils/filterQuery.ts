import { SelectQueryBuilder } from 'typeorm';
import { FilterArgs } from '../args/filter.arg';
import { SortArgs } from '../args/sort.arg';
import { searchString } from './searchString';

export function filterQuery<T>(
  table: string | any,
  query: SelectQueryBuilder<T>,
  filter: FilterArgs,
  sortOptions?: SortArgs,
) {
  let filteredQuery = query;
  const tableName = table.name ?? table;

  if (filter.program)
    filteredQuery = filteredQuery.andWhere('Class.program = :program', {
      program: filter.program,
    });

  if (filter.faculty_id)
    filteredQuery = filteredQuery.andWhere('Faculty.faculty_id = :faculty_id', {
      faculty_id: filter.faculty_id,
    });

  if (filter.keyword)
    filteredQuery = filteredQuery.andWhere(searchString(tableName, filter), {
      keyword: filter.keyword,
    });

  if (filter.semester_id)
    filteredQuery = filteredQuery.andWhere(
      'Semester.semester_id = :semester_id',
      {
        semester_id: filter.semester_id,
      },
    );

  if (filter.subjects)
    filteredQuery = filteredQuery.andWhere(
      'Subject.subject_id in (:...subjects)',
      {
        subjects: filter.subjects,
      },
    );

  if (filter.criteria_id)
    filteredQuery = filteredQuery.andWhere('Point.criteria_id = :criteria_id', {
      criterid_id: filter.criteria_id,
    });

  if (filter.lecturer_id)
    filteredQuery = filteredQuery.andWhere(
      'Lecturer.lecturer_id = :lecturer_id',
      {
        lecturer_id: filter.lecturer_id,
      },
    );

  if (filter.class_id)
    filteredQuery = filteredQuery.andWhere('Class.class_id = :class_id', {
      class_id: filter.class_id,
    });

  if (filter.class_type)
    filteredQuery = filteredQuery.andWhere('Class.class_type = :class_type', {
      class_type: filter.class_type,
    });

  if (sortOptions?.sortField) {
    const {
      sortField: { type },
      isAscending,
    } = sortOptions;

    if (type == 'point') {
      filteredQuery = filteredQuery.addOrderBy(
        'total_point',
        isAscending ? 'ASC' : 'DESC',
      );
    } else if (type == 'criteria') {
      // If you want to sort by criteria, just filter with the criteria
      // and sort by point, then just get the 'points' field of the subject
    } else {
      filteredQuery = filteredQuery.addOrderBy(
        `${tableName}.display_name`,
        isAscending ? 'ASC' : 'DESC',
      );
    }
  }

  return filteredQuery.andWhere('Faculty.is_displayed = true');
}

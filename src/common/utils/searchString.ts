import { FilterArgs } from '../args/filter.arg';

export function searchString(
  table: string,
  filter?: FilterArgs,
  matchCase = false,
  matchWholeWord = false,
) {
  if (matchCase && !matchWholeWord) {
  } else if (!matchCase && matchWholeWord) {
  } else if (matchCase && matchWholeWord) {
  } else {
    return `unaccent(${table}.display_name) ilike ('%' || unaccent(:keyword) || '%')`;
  }
}

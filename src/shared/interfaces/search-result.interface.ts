import { SearchType } from '../enums/search-type.enum';

export interface SearchResult {
  photo_path: string;
  slug: string;
  title: string;
  type: SearchType;
}

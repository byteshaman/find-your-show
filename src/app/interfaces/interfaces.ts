export interface SelectOption {
  id: number;
  name: string;
}

export interface SelectOptionString {
  id: string;
  name: string;
}

type andor = ',' | '.';
export interface SearchInput {
  andorgenres: andor,
  andorkeywords: andor,
  seasonNumMin: number,
  seasonNumMax: number | null,
  episodeNumMin: number,
  episodeNumMax: number | null,
  ratingMin: number,
  ratingMax: number,
  yearMin: number,
  yearMax: number,
  genres: number[],   
  excludedGenres: number[],   
  keywords: number[],   
  status: number,   
}

export interface ShowDetails {
  genres: SelectOption[];
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  originalname: string;
  origin_country: string[];
  original_language: string;
  status: string;
}

export interface DiscoverTvInfo {
  id: number,
  name: string,
  original_name: string,
  original_language: string,
  overview: string
}

export interface GenericGetResponse {
  page: number,
  results: SelectOption[],
  total_pages: number,
  total_results: number
} 

export interface DiscoverTvResponse extends GenericGetResponse {
  results: DiscoverTvInfo[],
}

export interface TVShowGenres {
  genres: SelectOption[];
}


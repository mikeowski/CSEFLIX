export interface Result {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface Movie {
  adult: boolean
  backdrop_path: string
  id: number
  title: string
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type Genre = {
  id: number
  name: string
}
export interface UpComing {
  dates: Dates
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface Dates {
  maximum: string
  minimum: string
}

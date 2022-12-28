import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import {
  Genre,
  Genres,
  Movie,
  MovieVideoResponse,
  Result,
  UpComing,
} from '../../../types'
export const movieRouter = router({
  getTrendingMovies: publicProcedure.query(async () => {
    const trendMovieUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`
    const response = await movieFetcher(trendMovieUrl, 2)
    return response
  }),
  getGenresByIds: publicProcedure
    .input(
      z.object({
        genreIds: z.array(z.number()).optional(),
        genreId: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`
      )
      const data = await response.json()
      return data.genres.filter((genre: Genre) => {
        if (input.genreId) {
          return genre.id === input.genreId
        } else if (input.genreIds) {
          return input.genreIds.includes(genre.id)
        }
      }) as Genre[]
    }),

  getMovieById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${input.id}?api_key=${process.env.API_KEY}`
      )
      const data = await response.json()
      return data as Movie
    }),
  getUpcomingMovies: publicProcedure.query(async () => {
    const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US`
    const response = await movieFetcher(upcomingUrl, 2)
    return response
  }),
  getTopRatedMovies: publicProcedure.query(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&sort_by=popularity.desc&region=U`
    )
    const data = await response.json()
    return data as Result
  }),
  getSearchedMovies: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const resArr: Movie[] = []
      for (let i = 0; i < 4; i++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${
            process.env.API_KEY
          }&query=${input.query}&page=${i + 1}`
        )
        const data: Result = await response.json()
        resArr.push(...data.results)
      }

      return resArr as Movie[]
    }),
  getCategories: publicProcedure.query(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`
    )
    const data = await response.json()
    return data as Genres
  }),
  getMoviesByCategory: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${input.id}&sort_by=popularity.desc&language=en-US`
      const response = await movieFetcher(url, 3)
      return response
    }),
  getMovieTrailer: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${input.id}/videos?api_key=${process.env.API_KEY}&language=en-US`
      )
      const data = await response.json()
      return data as MovieVideoResponse
    }),
  getNowPlayingMovies: publicProcedure.query(async () => {
    const nowPlaying_url = `https://api.themoviedb.org/3/movie/now_playing/?api_key=${process.env.API_KEY}&sort_by=popularity.desc&language=en-US`
    const response = await movieFetcher(nowPlaying_url, 2)
    return response
  }),
})

const movieFetcher = async (
  url: string,
  pageCount?: number
): Promise<Movie[]> => {
  const response = await fetch(url)
  const data = await response.json()
  const resArr: Movie[] = []
  if (pageCount && pageCount > 1) {
    for (let i = 1; i < pageCount; i++) {
      const response = await fetch(url + `&page=${i + 1}`)
      const data = await response.json()
      resArr.push(...data.results)
    }
  }
  return resArr
}

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
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`
    )
    const data = await response.json()
    return data as Result
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
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US`
    )
    const data = await response.json()
    return data as UpComing
  }),
  getTopRatedMovies: publicProcedure.query(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&sort_by=popularity.desc&region=U`
    )
    const data = await response.json()
    return data as UpComing
  }),
  getSearchedMovies: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${input.query}`
      )
      const data = await response.json()
      return data as Result
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
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${input.id}&sort_by=popularity.desc&language=en-US`
      )
      const data = await response.json()
      return data as Result
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
})

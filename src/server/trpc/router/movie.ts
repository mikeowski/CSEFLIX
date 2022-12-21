import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { Genre, Movie, Result, UpComing } from '../../../types'

export const movieRouter = router({
  getTrendingMovies: publicProcedure.query(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`
    )
    const data = await response.json()
    return data as Result
  }),
  getGenresByIds: publicProcedure
    .input(z.object({ genreIds: z.array(z.number()) }))
    .query(async ({ input }) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`
      )
      const data = await response.json()
      return data.genres.filter((genre: Genre) =>
        input.genreIds.includes(genre.id)
      ) as Genre[]
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
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}`
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
})

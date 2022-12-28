import { redirect } from 'next/dist/server/api-utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Movie } from '../../types'
import { trpc } from '../../utils/trpc'

const base_url = 'https://image.tmdb.org/t/p/original/'

const Banner = ({ movie }: { movie: Movie }) => {
  const { data, isLoading, isSuccess, isError } =
    trpc.movieRouter.getMovieTrailer.useQuery({ id: movie.id })
  function truncate(str: string, n: number) {
    return str?.length > n ? str.substring(0, n - 1) + '...' : str
  }
  const router = useRouter()

  return (
    <>
      {movie?.backdrop_path && (
        <div
          className="banner "
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url("${base_url}${movie?.backdrop_path}")`,
            backgroundPosition: 'center center',
          }}
        >
          <div className="banner__contents">
            <h1 className="banner__title font-header text-7xl font-black mb-8">
              {movie?.original_title}
            </h1>
            <div className="banner__buttons">
              <button
                className="banner__button"
                onClick={() => {
                  router.push(`/details/${movie.id}`)
                }}
              >
                Details
              </button>
              {isSuccess && data && data?.results[0] && (
                <Link
                  href={
                    'https://www.youtube.com/watch?v=' + data.results[0].key
                  }
                >
                  <button className="banner__button">Play Trailer</button>
                </Link>
              )}
            </div>
            <h1 className="banner__description text-xl">
              {truncate(movie?.overview, 150)}
            </h1>
          </div>
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-slate-50/0"></div>
        </div>
      )}
    </>
  )
}

export default Banner

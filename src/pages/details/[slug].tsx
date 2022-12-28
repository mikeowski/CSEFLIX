import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Layout } from '../../components/common'
import Loading from '../../components/Loading/Loading'
import MovieSlider from '../../components/MovieSlider/MovieSlider'
import { Movie, MovieDetailedResponse, People } from '../../types'
import { trpc } from '../../utils/trpc'
const base_url = 'https://image.tmdb.org/t/p/original/'
const Details = () => {
  const { slug } = useRouter().query
  const {
    data: movie,
    isLoading: movieLoading,
    isError: movieError,
    isSuccess: movieSuccess,
  } = trpc.movieRouter.getMovieById.useQuery({ id: Number(slug) })

  return (
    <Layout>
      {movieLoading && <Loading />}
      {movieError && <div>ERROR </div>}
      {movieSuccess && movie && (
        <div
          className="banner-detailed pt-32 flex flex-col space-y-20"
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url("${base_url}${movie?.backdrop_path}")`,
            backgroundPosition: 'center center',
          }}
        >
          <div className="w-full h-96 px-28 bg-black/30 flex gap-2">
            <div className="h-full w-64 relative">
              <Image
                src={`${base_url}${movie?.poster_path}`}
                objectFit="contain"
                layout="fill"
                alt={movie.original_title}
              />
            </div>
            <div className="h-full flex flex-col">
              <span className="space-x-2">
                <Image src="/Star.png" width={30} height={32} alt="logo" />
                <span className="text-4xl font-bold">
                  {movie.vote_average
                    .toString()
                    .split('.')
                    .map((v, i) => (i == 0 ? v : v.substring(0, 1)))
                    .join('.')}
                  /10
                </span>
              </span>
              <h1
                className={classNames(
                  'max-w-3xl font-black font-header',
                  movie.original_title.split(' ').length > 2
                    ? 'text-5xl'
                    : 'text-8xl'
                )}
              >
                {movie.original_title}
              </h1>
              <div className="text-3xl mt-2 font-black text-slate-300 flex space-x-8">
                <div>{movie.release_date.split('-').reverse().join('/')}</div>
                <div>
                  {movie.genres
                    .slice(0, 2)
                    .map((genre) => genre.name)
                    .join('/')}
                </div>
              </div>
              <p className="leading-5 max-w-2xl pt-10 text-xl font-semibold">
                {movie.overview}
              </p>
            </div>
            <TrailerButton id={movie.id} />
          </div>
          <div className="z-10 space-y-10">
            <div>
              <CastList movie_id={movie.id} />
            </div>
            <div>
              <RecomendationSlider movie={movie} />
            </div>
          </div>
          <div className="absolute bottom-0 w-full h-96 bg-gradient-to-t from-black to-slate-50/0"></div>
        </div>
      )}
    </Layout>
  )
}

const TrailerButton = ({ id }: { id: number }) => {
  const { data, isLoading, isSuccess, isError } =
    trpc.movieRouter.getMovieTrailer.useQuery({ id: id })
  return (
    <>
      {isSuccess && data && data.results && (
        <Link href={'https://www.youtube.com/watch?v=' + data.results[0]!.key}>
          <button className="mt-auto hover:border-2 transition-all mb-8 w-52 text-center font-black text-xl flex items-center justify-center h-14 border-4 rounded-lg">
            Watch Trailer
          </button>
        </Link>
      )}
    </>
  )
}

const CastList = ({ movie_id }: { movie_id: number }) => {
  const { data, isLoading, isError, isSuccess } =
    trpc.movieRouter.getPeoples.useQuery({ id: movie_id })
  return (
    <div className="flex gap-10 px-10">
      {isLoading && <Loading />}
      {isSuccess &&
        data &&
        data.cast.slice(0, 7).map((v) => (
          <div className="text-center">
            <div className="relative w-32 h-32 flex-col px-10">
              <Image
                src={
                  v.profile_path
                    ? base_url + v.profile_path
                    : '/default_user.webp'
                }
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <span>{v.original_name}</span>
          </div>
        ))}
    </div>
  )
}
const RecomendationSlider = ({ movie }: { movie: MovieDetailedResponse }) => {
  const {
    data: recomendations,
    isLoading: recomendationsLoading,
    isError: recomendationsError,
    isSuccess: recomendationsSuccess,
  } = trpc.movieRouter.getRecommendedMovies.useQuery({ id: movie.id })
  return (
    <>
      {recomendationsLoading && <Loading />}
      {recomendationsSuccess && recomendations && (
        <MovieSlider label="Recomendations" movies={recomendations} />
      )}
    </>
  )
}
export default Details

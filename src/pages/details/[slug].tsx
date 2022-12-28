import classNames from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Layout } from '../../components/common'
import MovieSlider from '../../components/MovieSlider/MovieSlider'
import { Movie } from '../../types'
import { trpc } from '../../utils/trpc'

const Details = () => {
  const { slug } = useRouter().query
  const {
    data: movie,
    isLoading: movieLoading,
    isError: movieError,
    isSuccess: movieSuccess,
  } = trpc.movieRouter.getMovieById.useQuery({ id: Number(slug) })
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
    isSuccess: categoriesSuccess,
  } = trpc.movieRouter.getCategories.useQuery()

  console.log(
    movie &&
      categories &&
      categories.genres &&
      movie.genre_ids &&
      categories.genres
        .filter((v) => {
          return movie.genre_ids.includes(v.id)
        })
        .map((v) => v.name)
        .join('/')
  )
  const base_url = 'https://image.tmdb.org/t/p/original/'
  return (
    <Layout>
      {movieLoading && <div>LOADİNG</div>}
      {movieError && <div>ERROR </div>}
      {movieSuccess && movie && (
        <div
          className="banner-detailed pt-32"
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url("${base_url}${movie?.backdrop_path}")`,
            backgroundPosition: 'center center',
          }}
        >
          <div className="w-full h-96 px-28 border flex gap-2">
            <div className="h-full w-64 relative">
              <Image
                src={`${base_url}${movie?.poster_path}`}
                objectFit="contain"
                layout="fill"
                alt={movie.original_title}
              />
            </div>
            <div className="h-full flex flex-col">
              <h1
                className={classNames(
                  'max-w-3xl font-black font-header',
                  movie.original_title.split(' ').length > 3
                    ? 'text-6xl'
                    : 'text-8xl'
                )}
              >
                {movie.original_title}
              </h1>
              <div className="text-3xl font-black text-slate-300">
                <span>{movie.release_date.split('-').reverse().join('/')}</span>
                <span>
                  {categoriesSuccess &&
                    movie.genre_ids &&
                    categories &&
                    categories.genres
                      .filter((v) => {
                        return movie.genre_ids.includes(v.id)
                      })
                      .map((v) => v.name)
                      .join('/')}
                </span>
              </div>
              <p className="leading-5 max-w-xl pt-10 text-xl font-semibold">
                {movie.overview}
              </p>
            </div>
            <div></div>
          </div>
          <div className="mt-auto">
            <RecomendationSlider movie={movie} />
          </div>
          <div className="absolute bottom-0 w-full h-96 bg-gradient-to-t from-black to-slate-50/0"></div>
        </div>
      )}
    </Layout>
  )
}
const RecomendationSlider = ({ movie }: { movie: Movie }) => {
  const {
    data: recomendations,
    isLoading: recomendationsLoading,
    isError: recomendationsError,
    isSuccess: recomendationsSuccess,
  } = trpc.movieRouter.getRecommendedMovies.useQuery({ id: movie.id })
  return (
    <>
      {recomendationsSuccess && recomendations && (
        <MovieSlider label="Recomendations" movies={recomendations} />
      )}
    </>
  )
}
export default Details

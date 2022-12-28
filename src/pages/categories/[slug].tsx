import { useRouter } from 'next/router'
import { Layout } from '../../components/common'
import MovieCard from '../../components/MovieCard/MovieCard'
import MovieSlider from '../../components/MovieSlider/MovieSlider'
import { trpc } from '../../utils/trpc'

const Popular = () => {
  const router = useRouter()
  const { slug } = router.query
  const {
    data: movies,
    isLoading,
    isSuccess,
    isError,
  } = trpc.movieRouter.getMoviesByCategory.useQuery({ id: Number(slug!) })
  const {
    data: genre,
    isLoading: genreLoading,
    isSuccess: genreSuccess,
    isError: genreError,
  } = trpc.movieRouter.getGenresByIds.useQuery({
    genreId: Number(slug!),
  })
  return (
    <>
      {genreLoading && <div>LOADING</div>}
      {genreError && <div>ERROR </div>}

      <Layout>
        <div className="mt-44 font-black text-center text-9xl font-header text-white">
          {genreLoading && <div>LOADING</div>}
          {genreError && <div>ERROR </div>}
          {genreSuccess && genre && <div>{genre[0]?.name}</div>}
        </div>
        <div className="mt-20 flex flex-wrap gap-8 justify-center">
          {isLoading && <div>LOADI NG</div>}
          {isError && <div>ERROR </div>}
          {isSuccess && movies && movies.map((v) => <MovieCard movie={v} />)}
        </div>
      </Layout>
    </>
  )
}

export default Popular

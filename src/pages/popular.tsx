import { useRouter } from 'next/router'
import { Layout } from '../components/common'
import Loading from '../components/Loading/Loading'
import MovieCard from '../components/MovieCard/MovieCard'
import { trpc } from '../utils/trpc'

const Popular = () => {
  const router = useRouter()
  const { slug } = router.query
  const {
    data: movies,
    isLoading,
    isSuccess,
    isError,
  } = trpc.movieRouter.getPopularMovies.useQuery()

  return (
    <>
      <Layout>
        {isLoading && <Loading />}
        {isError && <div>ERROR </div>}
        {isSuccess && movies && (
          <div>
            <div className="select-none mt-44 font-black text-center text-9xl font-header text-white">
              <div>Popular</div>
            </div>
            <div className="mt-20 flex flex-wrap gap-8 justify-center">
              {isLoading && <Loading />}
              {isError && <div>ERROR </div>}
              {isSuccess &&
                movies &&
                movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}

export default Popular

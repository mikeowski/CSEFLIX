import { useRouter } from 'next/router'
import { Layout } from '../../components/common'
import Loading from '../../components/Loading/Loading'
import MovieCard from '../../components/MovieCard/MovieCard'
import { trpc } from '../../utils/trpc'

const Popular = () => {
  const { slug } = useRouter().query
  const { data, isLoading, isSuccess, isError } =
    trpc.movieRouter.getSearchedMovies.useQuery({
      query: slug as string,
    })

  return (
    <Layout>
      <div className="mt-44 font-black text-center text-9xl font-header text-white">
        <div>{slug}</div>

        {isLoading && <Loading />}
        {isError && <div>ERROR </div>}
        {isSuccess && data && (
          <div className="mt-20 flex flex-wrap gap-8 justify-center">
            {isError && <div>ERROR </div>}
            {isSuccess &&
              data &&
              data.map(
                (movie) => movie.backdrop_path && <MovieCard movie={movie} />
              )}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Popular

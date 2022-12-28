import { useRouter } from 'next/router'
import { Layout } from '../../components/common'
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
      {isLoading && <div>LOADİNG</div>}
      {isError && <div>ERROR </div>}
      {isSuccess && data && (
        <div className="mt-20 flex flex-wrap gap-8 justify-center">
          {isLoading && <div>LOADİNG</div>}
          {isError && <div>ERROR </div>}
          {isSuccess &&
            data &&
            data.map(
              (movie) => movie.backdrop_path && <MovieCard movie={movie} />
            )}
        </div>
      )}
    </Layout>
  )
}

export default Popular

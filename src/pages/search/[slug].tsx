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
    <Layout title={slug as string}>
      {isLoading && <div>LOADİNG</div>}
      {isError && <div>ERROR </div>}
      {isSuccess && data && (
        <div className="flex flex-wrap gap-10 w-full  items-center">
          {data.map((movie) => {
            if (movie.backdrop_path)
              return <MovieCard key={movie.id} movie={movie} />
          })}
        </div>
      )}
    </Layout>
  )
}

export default Popular

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
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {data.results.map((movie) => (
            <MovieCard
              key={movie.id}
              name={movie.original_title}
              genreIds={movie.genre_ids}
              imageUrl={movie.backdrop_path}
              release_date={movie.release_date}
            />
          ))}
        </div>
      )}
    </Layout>
  )
}

export default Popular

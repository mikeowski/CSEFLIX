import { useRouter } from 'next/router'
import { Layout } from '../../components/common'
import MovieCard from '../../components/MovieCard/MovieCard'
import MovieSlider from '../../components/MovieSlider/MovieSlider'
import { trpc } from '../../utils/trpc'

const Popular = () => {
  const { slug } = useRouter().query
  const {
    data: movies,
    isLoading,
    isSuccess,
    isError,
  } = trpc.movieRouter.getMoviesByCategory.useQuery({ id: Number(slug) })
  const {
    data: genre,
    isLoading: genreLoading,
    isSuccess: genreSuccess,
    isError: genreError,
  } = trpc.movieRouter.getGenresByIds.useQuery({
    genreId: Number(slug),
  })
  return (
    <>
      {genreLoading && <div>LOADİNG</div>}
      {genreError && <div>ERROR </div>}
      {genreSuccess && genre && (
        <Layout title={genre[0]?.name}>
          {isLoading && <div>LOADİNG</div>}
          {isError && <div>ERROR </div>}
          {isSuccess && movies && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <MovieSlider movies={movies.results} />
            </div>
          )}
        </Layout>
      )}
    </>
  )
}

export default Popular

import { useRouter } from 'next/router'
import Banner from '../../components/Banner/Banner'
import { Layout } from '../../components/common'
import { trpc } from '../../utils/trpc'

const Details = () => {
  const { slug } = useRouter().query
  const {
    data: movie,
    isLoading: movieLoading,
    isError: movieError,
    isSuccess: movieSuccess,
  } = trpc.movieRouter.getMovieById.useQuery({ id: Number(slug) })
  const base_url = 'https://image.tmdb.org/t/p/original/'
  return (
    <Layout>
      {movieLoading && <div>LOADİNG</div>}
      {movieError && <div>ERROR </div>}
      {movieSuccess && movie && (
        <div
          className="banner-detailed pt-28"
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url("${base_url}${movie?.backdrop_path}")`,
            backgroundPosition: 'center center',
          }}
        >
          <div className="w-full h-72 px-28 border"></div>
          <div className="absolute bottom-0 w-full h-96 bg-gradient-to-t from-black to-slate-50/0"></div>
        </div>
      )}
    </Layout>
  )
}

export default Details

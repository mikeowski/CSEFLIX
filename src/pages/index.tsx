import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner/Banner'
import Layout from '../components/common/Layout'
import Loading from '../components/Loading/Loading'
import MovieCard from '../components/MovieCard/MovieCard'
import MovieSlider from '../components/MovieSlider/MovieSlider'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const {
    data: trendMovies,
    isLoading: trendLoading,
    isSuccess: trendSuccess,
  } = trpc.movieRouter.getTrendingMovies.useQuery()
  const {
    data: nowPlayingMovies,
    isLoading: nowPlayingLoading,
    isSuccess: nowPlayingSuccess,
  } = trpc.movieRouter.getNowPlayingMovies.useQuery()
  const {
    data: upcomingMovies,
    isLoading: upComingLoading,
    isSuccess: upcomingSuccess,
  } = trpc.movieRouter.getUpcomingMovies.useQuery()
  return (
    <Layout title="TITLE">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&display=swap"
          rel="stylesheet"
        />
        <title>CSEFLIX</title>
      </Head>
      {trendSuccess && trendMovies && (
        <div className="-mt-24">
          <Banner
            movie={
              trendMovies[Math.floor(Math.random() * trendMovies.length - 1)]!
            }
          />
        </div>
      )}
      <div className="space-y-10">
        {nowPlayingLoading && <Loading />}
        {nowPlayingSuccess && nowPlayingMovies && (
          <MovieSlider label="IN CINEMAS" movies={nowPlayingMovies} />
        )}
        {upComingLoading && <Loading />}
        {upcomingSuccess && upcomingMovies && (
          <MovieSlider label="UPCOMING" movies={upcomingMovies} />
        )}
        {}
      </div>
    </Layout>
  )
}

export default Home

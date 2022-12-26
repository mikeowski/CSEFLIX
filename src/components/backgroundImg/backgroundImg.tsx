import React from 'react'
import { trpc } from '../../utils/trpc'
import css from './index.module.css'
const BackgroundImg = () => {
    const { data, isLoading, isSuccess } =
    trpc.movieRouter.getTrendingMovies.useQuery()
  const backgroundImage = isSuccess ? data?.results[0]?.backdrop_path : ""
  return (
    <div className={css.container}>
      <img className={css.backgroundImg} src={`https://image.tmdb.org/t/p/original${backgroundImage}`}/>
      <div className={css.gradient}></div>
    </div>
  )
}

export default BackgroundImg
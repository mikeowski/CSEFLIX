import React from 'react'
import css from './index.module.css'
interface PropType {
    url?: string
}
const BackgroundImg = ({url}: PropType) => {
    
  return (
    <div className={css.container}>
      <img className={css.backgroundImg} src={`https://image.tmdb.org/t/p/original${url}`}/>
      <div className={css.gradient}></div>
    </div>
  )
}

export default BackgroundImg
import React from 'react'
import Header from '../Header/Header'
import css from './index.module.css'
import classNames from 'classnames'
import { title } from 'process'
interface PropType {
  children: React.ReactNode,
  title?: string,
  backgroundImg? : string
}
const Layout = ({children,title,backgroundImg}:PropType) => {
  return (
    <div className={css.container}>
        <img src={`https://image.tmdb.org/t/p/original${backgroundImg}`} className={css.backgroundImg}/>
        <Header/>
        {
            title && 
            <div className={css.title}>
              {title}
            </div>
        }
        <div className={css.contentSection}>
          <div className={css.content}>
            { children }
          </div>
        </div>
    </div>
  )
}
export default Layout
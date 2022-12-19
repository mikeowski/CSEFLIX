import React from 'react'
import Header from '../Header/Header'
import css from './index.module.css'
import classNames from 'classnames'
import { title } from 'process'
interface PropType {
  children: React.ReactNode,
  title?: string
}
const Layout = ({children,title}:PropType) => {
  return (
    <div className={css.container}>
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
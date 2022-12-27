import React from 'react'
import Header from '../Header/Header'
import css from './index.module.css'
import classNames from 'classnames'
import { title } from 'process'
interface PropType {
  children: React.ReactNode
  title?: string
}
const Layout = ({ children, title }: PropType) => {
  return (
    <div className="mt-24">
      <Header />
      <div>{children}</div>
      {title && <h1>{title}</h1>}
    </div>
  )
}
export default Layout

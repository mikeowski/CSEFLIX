import css from './index.module.css'
import React from 'react'
import classNames from 'classnames'
const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.logo}>
        <img src="./cseflixLogo.png" />
      </div>
      <div className={classNames(css.navItem, css.selected)}>Popular</div>
      <div className={css.navItem}>Categories</div>
      <div className={css.searchBox}>Search</div>
    </header>
  )
}
export default Header

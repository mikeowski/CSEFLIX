import css from './index.module.css'
import React from 'react'
const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.logo}>
        CSEFLIX
      </div>
      <div className={css.navItem}>
        Popular
      </div>
      <div className={css.navItem}>
        Categories
      </div>
      <div className={css.searchBox}>
        Search
      </div>
     
      </header>
  )
}
export default Header
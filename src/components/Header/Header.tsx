import css from './index.module.css'
import { useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
const Header = () => {
  const { pathname } = useRouter()
  const [search, setSearch] = useState('')
  return (
    <header className={css.header}>
      <div className={css.leftSide}>
        <Link href="/" className={css.logo}>
          <a>
            <Image src="/cseflixLogo.png" width={234} height={90} alt="logo" />
          </a>
        </Link>
        <Link href="/popular">
          <a
            className={classNames(
              css.navItem,
              pathname == '/popular' && css.selected
            )}
          >
            Popular
          </a>
        </Link>
        <Link href="/categories">
          <a
            className={classNames(
              css.navItem,
              pathname == '/categories' && css.selected
            )}
          >
            Categories
          </a>
        </Link>
      </div>
      <div className={css.searchBox}>
        <input
          className={css.search}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
        <button
          className={css.searchButton}
          onClick={() => console.log('aşlskdal')}
        >
          <Image alt="search" src="/search.png" width={15} height={15} />
        </button>
      </div>
    </header>
  )
}
export default Header

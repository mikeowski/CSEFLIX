import css from './index.module.css'
import { useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
const Header = () => {
  const { pathname, push } = useRouter()

  const [search, setSearch] = useState('')
  function searchFunc() {
    if (search) {
      push(`/search/${search}`)
    }
  }
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
              pathname == '/popular' && css.selected,
              pathname != '/popular' && 'hover:text-slate-400',
              'text-slate-400/80  transition-all'
            )}
          >
            Popular
          </a>
        </Link>
        <Link href="/categories">
          <a
            className={classNames(
              css.navItem,
              pathname == '/categories' && css.selected,
              pathname != '/categories' && 'hover:text-slate-400',
              'text-slate-400/80 hover:text-slate-400 transition-all'
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
        <button className={css.searchButton} onClick={() => searchFunc()}>
          <Image alt="search" src="/search.png" width={15} height={15} />
        </button>
      </div>
    </header>
  )
}
export default Header

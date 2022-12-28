import css from './index.module.css'
import { useEffect, useState } from 'react'
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
  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === 'Enter') {
        event.preventDefault()

        if (search.length > 0) {
          searchFunc()
        }
      }
    }

    document.addEventListener('keydown', keyDownHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [search])
  return (
    <header className={css.header}>
      <div className={css.leftSide}>
        <Link href="/" className={css.logo}>
          <a className="cursor-pointer select-none">
            <Image src="/cseflixLogo.png" width={234} height={90} alt="logo" />
          </a>
        </Link>
        <div className="ml-10 font-bold space-x-10">
          <Link href="/popular">
            <a
              className={classNames(
                ' text-orange-500 rounded-lg bg-black/50 hover:bg-black/70 px-4 py-2 text-xl shadow-lg  transition-all',
                pathname == '/popular'
                  ? 'scale-90 ring ring-black ring-offset-2 ring-offset-current'
                  : 'scale-100'
              )}
            >
              Popular
            </a>
          </Link>
          <Link href="/categories">
            <a
              className={classNames(
                ' text-orange-500 rounded-lg bg-black/50 hover:bg-black/70 px-4 py-2 text-xl shadow-lg  transition-all',
                pathname == '/categories'
                  ? 'scale-90 ring ring-black ring-offset-2 ring-offset-current'
                  : 'scale-100'
              )}
            >
              Categories
            </a>
          </Link>
        </div>
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

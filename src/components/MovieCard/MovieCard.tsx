import css from './index.module.css'
interface PropType {
  name: string
  voteAvarage: number
  release_date: string
  genres: { id: number; name: string }[]
}

const MovieCard = ({ name, voteAvarage, release_date, genres }: PropType) => {
  const upcoming = true
  return (
    <div>
      <h1>{name}</h1>
      <div className={css.bg}>
        {genres.map((genre) => {
          return <div key={genre.id}>{genre.name}</div>
        })}
        {upcoming ? <div></div> : null}
      </div>
    </div>
  )
}

export default MovieCard

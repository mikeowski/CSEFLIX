import Image from 'next/image'
import { trpc } from '../../utils/trpc'
import css from './index.module.css'
interface PropType {
  name: string
  release_date: string
  genreIds: number[]
  imageUrl: string
}

const MovieCard = ({ name, release_date, genreIds, imageUrl }: PropType) => {
  const {
    data: genres,
    isLoading,
    isSuccess,
  } = trpc.movieRouter.getGenresByIds.useQuery({ genreIds: genreIds })
  const counter = 0
  const today = new Date()
  const _releaseDate = Date.parse(release_date)
  let upcoming = ''
  function isReleased() {
    if (today.getTime() >= _releaseDate) {
      upcoming = ''
    } else {
      upcoming = 'Upcoming'
    }
  }
  isReleased()
  return (
    <div>
      <div className="movie-card">
        <Image
          className="movie-img"
          src={`https://image.tmdb.org/t/p/original${imageUrl}`}
          alt={name}
          layout="fill"
        />
        <p className="movie-text release-text">{upcoming}</p>
        <div className="movieCardContainer">
          <div className="genre-div">
            {isSuccess &&
              genres.map((genre) => (
                <p key={genre.id} className="movie-text genre">
                  {genre.name}
                </p>
              ))}
          </div>
          <p className="movie-text movie-name">{name}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard

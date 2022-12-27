import Image from 'next/image'
import { Movie } from '../../types'
import { trpc } from '../../utils/trpc'
import css from './index.module.css'
interface PropType {
  movie: Movie
}

const MovieCard = ({ movie }: PropType) => {
  const {
    data: genres,
    isLoading,
    isSuccess,
  } = trpc.movieRouter.getGenresByIds.useQuery({ genreIds: movie.genre_ids })
  const { original_title: name, release_date, backdrop_path: imageUrl } = movie
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
  )
}

export default MovieCard

import Image from 'next/image'
import { Movie } from '../../types'
import { trpc } from '../../utils/trpc'

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
        src={`https://image.tmdb.org/t/p/w500${imageUrl}`}
        alt={name}
        layout="fill"
      />
      <p className="movie-text release-text transition-all">{upcoming}</p>
      <div className="movieCardContainer">
        <p className="movie-name font-bold">{name}</p>
        {isSuccess && (
          <div className="genre-div">
            {genres.slice(0, 3).map((genre) => (
              <p key={genre.id} className="movie-text genre">
                {genre.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieCard

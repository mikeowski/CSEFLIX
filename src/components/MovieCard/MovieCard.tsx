import css from './index.module.css'
interface PropType {
  name: string
  release_date: string
  genres: { id: number; name: string }[]
}

const MovieCard = ({ name, release_date, genres }: PropType) => {
  let counter = 0;
  let today = new Date();
  let releaseDate = Date.parse(release_date);
  let upcoming = ""
  function isReleased() {
    if (today.getTime() >= releaseDate) {
      upcoming = "";
    }
    else {
      upcoming = "Upcoming";
    }
  }
  isReleased()
  return (
    <div>
      <div className="movie-card">
        <img className="movie-img" src=" https://m.media-amazon.com/images/M/MV5BMThlOWE3MWEtZjM4Ny00M2FiLTkyMmYtZGY3ZTcyMzM5YmNlXkEyXkFqcGdeQWpnYW1i._V1_.jpg" alt="" />
        <p className="movie-text release-text">{upcoming}</p>
        <div className="movieCardContainer">
            <div className="genre-div">
               {genres.map((genre) => ( <p key={genre.id} className="movie-text genre">{genre.name} </p>))}
            </div>
            <p className="movie-text movie-name">{name}</p>

        </div>
      </div>
    </div>
  )
}

export default MovieCard

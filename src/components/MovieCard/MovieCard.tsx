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
  return (
    <div>
      <div id="image">
        <img className="peaky-img" src=" https://m.media-amazon.com/images/M/MV5BMThlOWE3MWEtZjM4Ny00M2FiLTkyMmYtZGY3ZTcyMzM5YmNlXkEyXkFqcGdeQWpnYW1i._V1_.jpg" alt="" />
        <p className="movie-text release-text">{upcoming}</p>
        <div className="container">
          <div className="genre-div">
            <p className="movie-text genre">{genres[0]!.name}</p>
            <p className="movie-text genre">{genres[1]!.name}</p>
            <p className="movie-text genre">{genres[2]!.name} </p>
          </div>
          <p className="movie-text movie-name">{name}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import MovieCard from '../MovieCard/MovieCard'
import { Movie } from '../../types'
import useViewport from '../../hooks/useViewport'
const MovieSlider = ({ movies, label }: { movies: Movie[]; label: string }) => {
  const { width } = useViewport()
  return (
    <>
      <div className="px-10">
        <h1 className="text-2xl font-bold text-white pl-2">{label}</h1>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          className="h-32 "
          slidesPerView={Math.floor((width - 90) / 200)}
          navigation
          cssMode
        >
          {movies.map((movie) => {
            return (
              <SwiperSlide>
                <MovieCard movie={movie} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </>
  )
}

export default MovieSlider

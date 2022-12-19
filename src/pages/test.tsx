import React from 'react'
import MovieCard from '../components/MovieCard/MovieCard'

const test = () => {
  return (
    <div className="testPage">
      <MovieCard
        name="Mad Max: Fury Road"
        release_date="2015-05-13"
        
        genres={[
          {
            id: 28,
            name: 'Action',
          },
          {
            id: 12,
            name: 'Adventure',
          },
          {
            id: 878,
            name: 'Science Fiction',
          },
        ]}
      />
    </div>
  )
}

export default test

import React, { useEffect, useState } from 'react'
import MovieCard from '../MovieCard'
import { useUser } from '../../hooks/UserContext'; 
import { fetchFavoredMovies } from '../../../sanity/services/movieServices';

export default function FavoriteListFetchResult() {
  const { loggedInUser } = useUser()
  const [movies, setMovies] = useState([])

  const getFavoredMovies = async (loggedInUser) => {
    const data = await fetchFavoredMovies(loggedInUser)
    setMovies(data)
  }

  useEffect(() => {
    getFavoredMovies(loggedInUser)
  }, [loggedInUser])

  return (
  <section className="movie-cards-section">
      {
        movies?.map(movie => (
          movie?.favoredMovies?.map((favMovie, idx) => (
            < MovieCard
            key={idx}
            movietitle={favMovie.movietitle}
            poster={favMovie.poster}
            IMDBid={favMovie.IMDBid}
            genres={favMovie.genres}
            />
          ))
        ))
      
    }
    </section>
  )
}


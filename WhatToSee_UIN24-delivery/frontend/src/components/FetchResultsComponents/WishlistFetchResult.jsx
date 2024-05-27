import React, { useEffect, useState } from 'react'
import MovieCard from '../MovieCard'
import { useUser } from '../../hooks/UserContext'; 
import { fetchWishListedMovies } from '../../../sanity/services/movieServices';

export default function WishlistFetchResult() {
  const { loggedInUser } = useUser()
  const [movies, setMovies] = useState([])

  const getWishlistedMovies = async(loggedInUser) => {
    const data = await fetchWishListedMovies(loggedInUser)
    setMovies(data)
  }
  useEffect(() => {
    getWishlistedMovies(loggedInUser)
  }, [loggedInUser])
  
  return (
    
    <section className="movie-cards-section">
      {
        movies?.map(movie => (
          movie?.wishlistedMovies?.map((wlMovie, idx) => (
            
            <MovieCard
              key={idx}
              movietitle={wlMovie.movietitle}
              poster={wlMovie.poster}
              IMDBid={wlMovie.IMDBid}
              genres={wlMovie.genres}
            />
          ))
        ))
      }
    </section>
  )
}

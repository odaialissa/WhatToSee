import React, { useEffect, useState }from 'react'
import { fetchMovieListsOfUsers } from '../../../sanity/services/movieServices';
import { useUser } from '../../hooks/UserContext';
import MovieCard from '../MovieCard';

export default function SameFavoredMovies({friend}) {
   const { loggedInUser } = useUser();
   
   const [loggedInUserFavMovies, setLoggedInUserFavMovies] = useState([]);
   const [friendFavMovies, setFriendFavMovies] = useState([]);
   const [sameMoviesComparison, setSameMoviesComparison] = useState([]);
   const [totalMovies, setTotalMovies] = useState(0)

   const getSameFavoredMovies = async (loggedInUser, friend) => {

   const data = await fetchMovieListsOfUsers(loggedInUser, friend)

   const loggedInUserFavMovies = data[loggedInUser][0]?.favoredMovies || []
   const friendFavMovies = data[friend][0]?.favoredMovies || []
   
   setLoggedInUserFavMovies(loggedInUserFavMovies)
   setFriendFavMovies(friendFavMovies)
   
   const sameMoviesComparison = loggedInUserFavMovies.filter(
      movie1 => friendFavMovies.some(movie2 => movie2.movietitle === movie1.movietitle))
   
      setSameMoviesComparison(sameMoviesComparison)
      setTotalMovies(sameMoviesComparison.length)
   }
   
   
   useEffect(() => {
      getSameFavoredMovies(loggedInUser, friend)
   }, [loggedInUser])

   return (
      <section className="GoSafe-list">
         <h4>Go Safe!</h4>
         <p>Dere har {totalMovies} felles film(er) i deres favoritt lister</p>
         <section className="movie-cards-section">
            {
               sameMoviesComparison?.map((movie, idx) => (
                  < MovieCard
                  key={idx}
                  movietitle={movie.movietitle}
                  poster={movie.poster}
                  IMDBid={movie.IMDBid}
                  genres={movie.genres}
                  />
               ))
            }
         </section>
      </section>
  )
}

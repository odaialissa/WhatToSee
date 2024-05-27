import React, { useEffect, useState }from 'react'
import { fetchMovieListsOfUsers } from '../../../sanity/services/movieServices';
import { useUser } from '../../hooks/UserContext';
import MovieCard from '../MovieCard';

export default function SameWishlistedMovies({friend}) {
   const { loggedInUser } = useUser();
   
   const [loggedInUserWLMovies, setLoggedInUserWLMovies] = useState([]);
   const [friendWLMovies, setFriendWLMovies] = useState([]);
   const [sameMoviesComparison, setSameMoviesComparison] = useState([]);
   const [totalMovies, setTotalMovies] = useState(0)

   const getSameWishlistedMovies = async (loggedInUser, friend) => {

   const data = await fetchMovieListsOfUsers(loggedInUser, friend)
   
   const loggedInUserWLMovies = data[loggedInUser][0]?.wishlistedMovies || []
   const friendWLMovies = data[friend][0]?.wishlistedMovies || []
    
   setLoggedInUserWLMovies(loggedInUserWLMovies)
   setFriendWLMovies(friendWLMovies)
   
   
   const SameMoviesComparison = loggedInUserWLMovies.filter(
      movie1 => friendWLMovies.some(movie2 => movie2.movietitle === movie1.movietitle))
      setSameMoviesComparison(SameMoviesComparison)

      setTotalMovies(SameMoviesComparison.length)
   }
   

   useEffect(() => {
      getSameWishlistedMovies(loggedInUser, friend)
   },[loggedInUser])

   return (
     <section className="catchUp-list">
         <h4>Catch Up!</h4>
         <p>Dere har {totalMovies} felles film(er) i deres ønskelister</p>
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


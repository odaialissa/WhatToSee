import React, { useEffect, useState } from 'react'
import { fetchMovieListsOfUsers } from '../../../sanity/services/movieServices';
import { useUser } from '../../hooks/UserContext';
import MovieCard from '../MovieCard';

export default function FavoritesWishlistComparison({friend}) {
   const { loggedInUser } = useUser();
   
   const [loggedInUserFavMovies, setLoggedInUserFavMovies] = useState([]);
   const [loggedInUserWlMovies, setLoggedInUserWlMovies] = useState([]);
   const [friendFavMovies, setFriendFavMovies] = useState([]);
   const [friendWlMovies, setFriendWlMovies] = useState([]);
   const [favoredAndWishlistComparison, setFavoredAndWishlistComparison] = useState([]);
   const [wishlistAndFavoredComparison, setWishlistAndFavoredComparison] = useState([]);
   const [comparedMoviesList, setComparedMoviesList] = useState([])


   const getComparedMovieListsOfUsers = async (loggedInUser, friend) => {
      const data = await fetchMovieListsOfUsers(loggedInUser, friend)

      const loggedInUserFavMovies = data[loggedInUser][0]?.favoredMovies || []
      const loggedInUserWlMovies = data[loggedInUser][0]?.wishlistedMovies || []
      const friendFavMovies = data[friend][0]?.favoredMovies || []
      const friendWlMovies = data[friend][0]?.wishlistedMovies || []
      
      setLoggedInUserFavMovies(loggedInUserFavMovies)
      setLoggedInUserWlMovies(loggedInUserWlMovies)
      setFriendFavMovies(friendFavMovies)
      setFriendWlMovies(friendWlMovies)

      const favoredAndWishlistComparison = loggedInUserFavMovies.filter(
         movie1 => friendWlMovies.some(movie2 => movie2.movietitle === movie1.movietitle))
         .map(movie => ({
            ...movie,
            user: loggedInUser, list: "Favoritt",
            comparedWith: friend, comparedList: "Ønskeliste"
         }))
      setFavoredAndWishlistComparison(favoredAndWishlistComparison)

      const wishlistAndFavoredComparison = loggedInUserWlMovies.filter(
         movie1 => friendFavMovies.some(movie2 => movie2.movietitle === movie1.movietitle))
         .map(movie => ({
            ...movie,
            user: friend, list: "Favoritt",
            comparedWith: loggedInUser, comparedList: "Ønskeliste"
         }))
      setWishlistAndFavoredComparison(wishlistAndFavoredComparison)

      const comparedMoviesList = [...favoredAndWishlistComparison, ...wishlistAndFavoredComparison]
      const uniqueComparedMoviesList = []
      comparedMoviesList.forEach(movie => {
         if(!uniqueComparedMoviesList.some(uniqueMovie => uniqueMovie.movietitle === movie.movietitle))
         {
            uniqueComparedMoviesList.push(movie)
      }
      })
      setComparedMoviesList(uniqueComparedMoviesList)
   }
   
   useEffect(() => {
      getComparedMovieListsOfUsers(loggedInUser, friend)
   }, [loggedInUser])

   return (
   <section className="fav-and-wishlist-compare-sec">
         <h5>Ønskelister og favoritter</h5>
         <p>Dere har filmer som er på ønskelisten til en og favorittlisten til den andre!
         Perfekt anledning til å introdusere hverandre for nye filmopplevelser!</p>
         <section className="movie-cards-section">
               {comparedMoviesList?.map((movie, idx) => (
            <MovieCard
               movietitle={movie.movietitle}
               poster={movie.poster}
               IMDBid={movie.IMDBid}
               user={movie.user}
               userList={movie.list}
               comparedWith={movie.comparedWith}
               comparedList={movie.comparedList}
               />
         ))}
         </section>
      </section>
      
  )
}

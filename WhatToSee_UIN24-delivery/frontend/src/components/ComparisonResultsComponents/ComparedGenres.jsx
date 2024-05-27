import React, { useState, useEffect } from 'react';
import { fetchSameGenres } from '../../../sanity/services/genreServices';
import { useUser } from '../../hooks/UserContext';
import { Link, useNavigate } from 'react-router-dom';

export default function ComparedGenres({friend}) {
   const { loggedInUser } = useUser();
   const navigate = useNavigate();

   const [loggedInUserFavGenres, setLoggedInUserFavGenres] = useState([]);
   const [friendFavGenres, setFriendFavGenres] = useState([]);
   const [sameGenresComparison, setSameGenresComparison] = useState([]);

   const getSameGenres = async (loggedInUser, friend) => {
      try {
         const data = await fetchSameGenres(loggedInUser, friend);
         
         if (data && data[loggedInUser] && data[friend]) {
            const loggedInUserFavGenres = data[loggedInUser][0]?.favoredGenres || [];
            const friendFavGenres = data[friend][0]?.favoredGenres || [];

            setLoggedInUserFavGenres(loggedInUserFavGenres);
            setFriendFavGenres(friendFavGenres);

            const sameGenresComparison = loggedInUserFavGenres.filter(genre =>
               friendFavGenres.includes(genre)
            );
            setSameGenresComparison(sameGenresComparison);
         } else {
            console.error('Data for one or both users is missing');
         }
      } catch (error) {
         console.error("Error fetching same genres:", error);
      }
   }

   useEffect(() => {
      if (loggedInUser && friend) {
         getSameGenres(loggedInUser, friend);
      }
   }, [loggedInUser, friend]);

   // const handleGenreClick = (genre) => {
   //    navigate(`/movies_by_genre?genre=${genre}`);
   // };

   return (
      <section className="genre-section">
         <h3>Utforsk:</h3>
         <p>Sjekk hvilke filmer som er tilgjengelige innenfor sjangrene du og {friend} begge liker.</p>
         {sameGenresComparison.map((genre, idx) => (
            <Link key={idx} to={`/movies_by_genre?genre=${genre}`}>
               {genre}
            </Link>
         ))}
      </section>
   );
}

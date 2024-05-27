import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/UserContext'; // Importer useUser-hooken
import { Link, useLocation } from 'react-router-dom';
import { FaSadTear } from "react-icons/fa";

import ComparedGenres from './ComparisonResultsComponents/ComparedGenres';
import FavoritesWishlistComparison from './ComparisonResultsComponents/FavoritesWishlistComparison';
import SameFavoredMovies from './ComparisonResultsComponents/SameFavoredMovies';
import SameWishlistedMovies from './ComparisonResultsComponents/SameWishlistedMovies';

export default function Dashboard() {
  const { loggedInUser } = useUser();
  const location = useLocation();
  const { friend } = location.state || []
  
  if (loggedInUser) {
    return (
      <>
        <main>
          <h2>Forslag for {loggedInUser} og {friend} </h2>
          {/* GENRE SECTION */}
          <ComparedGenres friend={friend} />
          {/* LISTS of movies */}
          <section className="movieLists-section">
            <SameWishlistedMovies friend={friend} />
            <span className='divider'></span>
            <SameFavoredMovies friend={friend}/>
          </section>
          <FavoritesWishlistComparison friend={friend} />
        </main>
      </>
    );
  } else {
    return (
      <>
        <main>
          <section className='login-err-msg'>
            <h2 className='oops'>Ooops ! <FaSadTear /></h2>
            <p className='error-msg'>403 - Du kan ikke få tilgang til denne siden fordi du ikke er logget inn.</p>
            <Link to={"/"}>Logg inn</Link>
          </section>
        </main>
      </>
    );
  }
}

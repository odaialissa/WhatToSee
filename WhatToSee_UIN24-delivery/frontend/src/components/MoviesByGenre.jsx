import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchMoviesByGenre } from '../../sanity/services/moviesByGenreServices';
import MovieCard from './MovieCard';

export default function MoviesByGenre() {
   const [movies, setMovies] = useState([]);
   const location = useLocation();
   const params = new URLSearchParams(location.search);
   const genre = params.get('genre');

   useEffect(() => {
      const getMovies = async () => {
         const data = await fetchMoviesByGenre(genre);
         setMovies(data);
      };
      if (genre) {
         getMovies();
      }
   }, [genre]);

   return (
      <main>
      <h2>Filmer i sjangeren: {genre} ({movies.length}) Filmer</h2> 
      <section className="movies-by-genre">
         <section className="movie-cards-section">
            {movies.map((movie, idx) => (
               <MovieCard
               key={idx}
               movietitle={movie.movietitle}
               poster={movie.poster}
               IMDBid={movie.IMDBid}
               genres={movie.genres}
               />
            ))}
         </section>
      </section>
      </main>
   );
}

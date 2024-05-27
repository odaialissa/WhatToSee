import { client } from "../client";

export async function fetchMoviesByGenre(genre) {
   try {
      const data = await client.fetch(
         `*[_type == "movies" && $genre in genres]{
            movietitle,
            poster,
            IMDBid,
            genres
         }`, 
         { genre }
      );
      return data;
   } catch (error) {
      console.error("Error fetching movies by genre:", error);
   }
}

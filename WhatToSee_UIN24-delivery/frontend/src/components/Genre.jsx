import React, { useEffect, useState } from 'react'; 
import { useUser } from '../hooks/UserContext'; 
import { writeClient, client } from '../../sanity/client'; 
import { Link } from 'react-router-dom'; 
import { FaStar } from "react-icons/fa"; 

export default function Genre() {
    const [genres, setGenres] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const { userId } = useUser(); 

    useEffect(() => {
        fetchGenres(); 
    }, []);

    const fetchGenres = async () => {
        setLoading(true); 
        const url = 'https://moviesdatabase.p.rapidapi.com/titles/utils/genres';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'd2ca980ddcmsh43b9d3e642be0a8p1d08c1jsne846de12bbc5',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        };
    
        try {
            const response = await fetch(url, options); // Hent sjangere fra API-et
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Hent brukerdokumentet fra Sanity
            const userDoc = await writeClient.fetch(`*[_type == "users" && _id == $userId]{favoredGenres}`, { userId });

            const favoriteGenresSet = new Set(userDoc[0]?.favoredGenres || []);
    
            // Hent antall filmer for hver sjanger fra Sanity
            const genresWithCounts = await Promise.all(data.results.map(async genre => {
                const count = await client.fetch(`count(*[_type == "movies" && "${genre}" in genres])`);
                return {
                    name: genre,
                    count: count,
                    isFavorite: favoriteGenresSet.has(genre)
                };
            }));
    
            setGenres(genresWithCounts); 
            setError(null); 
        } catch (error) {
            console.error('Failed to fetch genres:', error);
            setError('Failed to fetch genres'); 
        } finally {
            setLoading(false); 
        }
    };

    
    const toggleFavorite = async (genreName) => {
        const updatedGenres = genres.map(genre => {
            if (genre.name === genreName) {
                return { ...genre, isFavorite: !genre.isFavorite };
            }
            return genre;
        });
        setGenres(updatedGenres); 

        const userDoc = await writeClient.fetch(`*[_type == "users" && _id == $userId]{favoredGenres}`, { userId });
        const favoredGenres = new Set(userDoc[0]?.favoredGenres || []);

        if (favoredGenres.has(genreName)) {
            favoredGenres.delete(genreName);
        } else {
            favoredGenres.add(genreName);
        }

        try {
            await writeClient.patch(userId)
                .set({ favoredGenres: Array.from(favoredGenres) })
                .commit();
            console.log('Genre favorite status updated:', genreName);
        } catch (error) {
            console.error('Error updating favorite genres:', error);
        }
    };

    return (
        <>
            <main>

            <h2>Sjangere</h2>
            {loading ? (
                <p>Laster...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <section>
                    <ul className="genre-list">
                        {genres?.map((genre, idx) => (
                            genre.name !== null ? (
                                <li key={idx} className="genre-item">
                                    
                                    <Link to={`/movies_by_genre?genre=${genre.name}`}>
                                        {genre.name} ({genre.count})
                                    </Link>
                                    <button
                                        className={genre.isFavorite ? 'add-btn' : 'remove-btn'}
                                        onClick={() => toggleFavorite(genre.name)}
                                        >
                                        <FaStar /> {genre.isFavorite ? 'Remove from favorite' : 'Add to favorite'}
                                    </button>
                                </li>
                            ) : null
                        ))}
                    </ul>
                </section>
            )}
            </main>
        </>
    );
}

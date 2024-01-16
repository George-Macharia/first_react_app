import { useState, useEffect } from "react";

import MovieCard from "./MovieCard";

import './App.css';
import SearchIcon from './search.svg';

import { SpeedInsights } from "@vercel/speed-insights/next";



// 4b79c65f

const API_URL = 'https://www.omdbapi.com?apikey=4b79c65f';

const movie1 = {
    "Title": "Spiderman in Cannes",
    "Year": "2016",
    "imdbID": "tt5978586",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZDlmMGQwYmItNTNmOS00OTNkLTkxNTYtNDM3ZWVlMWUyZDIzXkEyXkFqcGdeQXVyMTA5Mzk5Mw@@._V1_SX300.jpg"
}

const App = () => {

    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect (() => {
        searchMovies('Spiderman');
    }, []);
    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input 
                placeholder="Search for Movies"
                value= {search}
                onChange={(e) => setSearch(e.target.value)}
                />

                <img
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(search)}
                />

            </div>

                {
                    movies?.length > 0
                        ? (
                            <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie}/>
                            ))}
                            </div>
                        ) : (
                            <div className="empty">
                                    <h2>No Movies Found</h2>
                            </div>
                        )
                }

<SpeedInsights/>
        </div>
    );
};

export default App;
import React, { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import './App.css';
import Main from "../Main/Main.jsx";
import Movies from "../Movies/Movies.jsx";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Profile from "../Profile/Profile.jsx"
import Register from "../Register/Register.jsx"
import Login from "../Login/Login.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import { movies } from '../../utils/movies';
import { cardsConstants } from "../../utils/cardsConstants.js";
const App = () => {

    const [loggedIn, setLoggedIn] = useState(true);
    const [shortMovies, setShortMovies] = useState([]);
    const [isMoviesShort, setIsMoviesShort] = useState(false);


    const onFilterChange = () => {
        setIsMoviesShort(!isMoviesShort);
        setShortMovies(movies.filter(card => card.duration <= cardsConstants.SHORT_MOVIE_DURATION));
    }


    return (
        <>
            <div className="page">
                <Routes>
                    <Route
                        path="/"
                        element={<Main loggedIn={loggedIn} />}
                    />
                    <Route
                        path="/movies"
                        element={<Movies isMoviesShort={isMoviesShort} onFilterChange={onFilterChange} shortMovies={shortMovies} cards={movies} loggedIn={loggedIn} />}
                    />
                    <Route
                        path="/saved-movies"
                        element={<SavedMovies isMoviesShort={isMoviesShort} onFilterChange={onFilterChange} shortMovies={shortMovies} cards={movies} loggedIn={loggedIn} />}
                    />
                    <Route
                        path="/profile"
                        element={<Profile loggenIn={loggedIn} />}
                    />
                    <Route
                        path="/signup"
                        element={<Register />}
                    />
                    <Route
                        path="/signin"
                        element={<Login />}
                    />
                    <Route
                        path="*"
                        element={<NotFoundPage />}
                    />
                </Routes>
            </div>
        </>
    );
}

export default App;
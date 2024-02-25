import React, { useState, useEffect } from 'react'
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useLocation } from 'react-router-dom';
import { cardsConstants } from '../../utils/cardsConstants.js';

function Movies({
    movies,
    savedMovies,
    isLoggedIn,
    onSearchMovies,
    isLoading,
    isSuccess,
    errorText,
    toggleBurgerMenu,
    isBurgerMenuOpen,
    onCheckboxChange,
    onSaveMovie,
    onDeleteMovie
}) {

    const location = useLocation();
    const [moviesToBeDisplayed, setMoviesToBeDisplayed] = useState(movies);
    const [isCheckboxState, setIsCheckboxState] = useState(false);


    useEffect(() => {
        if (location.pathname === '/movies') {
            const foundMovies = JSON.parse(localStorage.getItem('foundMovies')) || [];
            const checkboxState = localStorage.getItem('shortMoviesCheckbox');
            setIsCheckboxState(checkboxState === 'true');
            const filteredFoundMovies = foundMovies.filter((movie) => checkboxState === "true" ? movie.duration <= cardsConstants.SHORT_MOVIE_DURATION : true);

            setMoviesToBeDisplayed(filteredFoundMovies);
        }


    }, [isCheckboxState, moviesToBeDisplayed, location.pathname]);

    return (
        <>
            <Header
                toggleBurgerMenu={toggleBurgerMenu}
                isBurgerMenuOpen={isBurgerMenuOpen}
                isLoggedIn={isLoggedIn} />
            <main>
                <SearchForm
                    onCheckboxChange={onCheckboxChange}
                    onSearchMovies={onSearchMovies}
                    isLoading={isLoading}
                    errorText={errorText}
                />
                <MoviesCardList
                    errorText={errorText}
                    isSuccess={isSuccess}
                    isLoading={isLoading}
                    movies={moviesToBeDisplayed}
                    savedMovies={savedMovies}
                    onSaveMovie={onSaveMovie}
                    onDeleteMovie={onDeleteMovie}
                />
            </main>
            <Footer />
        </>

    )
}

export default Movies;
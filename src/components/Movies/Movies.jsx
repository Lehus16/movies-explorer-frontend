import React, { useState, useEffect } from 'react'
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useLocation } from 'react-router-dom';

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
    const [moviesToBeDisplayed, setMoviesToBeDisplayed] = useState([]);
    const [isMoviesLoading, setIsMoviesLoading] = useState(isLoading);

    useEffect(() => {
        if (location.pathname === '/movies') {
            const foundMovies = localStorage.getItem('foundMovies');
            if (foundMovies) {
                setTimeout(() => {
                    setIsMoviesLoading(false);
                }, 1000);
                setIsMoviesLoading(true);
                setMoviesToBeDisplayed(JSON.parse(foundMovies));
            } else {
                setMoviesToBeDisplayed(movies);
            }
        }
    }, [location.pathname, movies]);


    return (
        <>
            <Header
                toggleBurgerMenu={toggleBurgerMenu}
                isBurgerMenuOpen={isBurgerMenuOpen}
                isLoggedIn={isLoggedIn} />
            <main>
                <SearchForm
                    onCheckboxChange={onCheckboxChange}
                    onSearchMovies={onSearchMovies} />
                <MoviesCardList
                    errorText={errorText}
                    isSuccess={isSuccess}
                    isLoading={isMoviesLoading}
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
import React from 'react'
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

function SavedMovies({
    movies,
    isLoggedIn,
    toggleBurgerMenu,
    isBurgerMenuOpen,
    onDeleteMovie,
    searhSavedMovies,
}) {
    return (
        <>
        
            <Header
                toggleBurgerMenu={toggleBurgerMenu}
                isBurgerMenuOpen={isBurgerMenuOpen}
                isLoggedIn={isLoggedIn} />
            <main>
                <SearchForm
                    searhSavedMovies={searhSavedMovies}

                />
                <MoviesCardList
                    onDeleteMovie={onDeleteMovie}
                    movies={movies}

                />
            </main>
            <Footer />
        </>

    )
}

export default SavedMovies;
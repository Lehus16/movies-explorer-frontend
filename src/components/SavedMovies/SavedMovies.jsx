import React from 'react'
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

function SavedMovies({
    movies,
    isLoggedIn,
    isLoading,
    toggleBurgerMenu,
    isBurgerMenuOpen,
    onDeleteMovie,
    searhSavedMovies,
    onCheckboxChange,
    errorText,
    isSuccess
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
                    onCheckboxChange={onCheckboxChange}
                    isLoading={isLoading}
                    errorText={errorText}
                />
                <MoviesCardList
                    onDeleteMovie={onDeleteMovie}
                    movies={movies}
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                />
            </main>
            <Footer />
        </>

    )
}

export default SavedMovies;
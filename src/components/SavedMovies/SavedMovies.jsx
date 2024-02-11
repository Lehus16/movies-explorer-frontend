import React from 'react'
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

function SavedMovies({ cards, isLoggedIn, onFilterChange, isMoviesShort, shortMovies }) {


    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <main>
                <SearchForm onFilterChange={onFilterChange} />
                <MoviesCardList isMoviesShort={isMoviesShort} shortMovies={shortMovies} isLoading={false} cards={cards} />
            </main>
            <Footer />
        </>

    )
}

export default SavedMovies;
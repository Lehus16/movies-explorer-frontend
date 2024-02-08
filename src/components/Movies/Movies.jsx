import React from 'react'
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ cards, loggedIn, shortMovies, onFilterChange, isMoviesShort }) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            <main>
                <SearchForm onFilterChange={onFilterChange} />
                <MoviesCardList isMoviesShort={isMoviesShort} shortMovies={shortMovies} isLoading={false} cards={cards} />
            </main>
            <Footer />
        </>

    )
}

export default Movies;
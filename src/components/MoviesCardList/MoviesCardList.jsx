import React, { useEffect, useState } from 'react'
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useLocation } from 'react-router-dom';
import { screenResolutionConstants } from '../../utils/screenResolutionConstants';
import { cardsConstants } from '../../utils/cardsConstants';
import useDebouncedFunction from '../../hooks/useDebouncedFunction';



function MoviesCardList({
    movies,
    savedMovies,
    isLoading,
    errorText,
    isSuccess,
    onSaveMovie,
    onDeleteMovie
}) {

    const [cardsCount, setCardsCount] = useState(cardsConstants.ZERO);

    const location = useLocation();


    // Функция для проверки сохранена ли карточка
    const isSavedMovie = (savedMovies, movie) => {
        return location.pathname === '/movies' ? savedMovies.find((savedMovie) => savedMovie.movieId === movie.id) : false
    }

    // Функция ресайза окна для определения количества карточек
    const rezizeWindow = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth >= screenResolutionConstants.tablet) {
            setCardsCount(cardsConstants.CARDS_COUNT_FOR_DESKTOP);
        } else if (windowWidth <= screenResolutionConstants.tablet && windowWidth > screenResolutionConstants.mobile) {
            setCardsCount(cardsConstants.CARDS_COUNT_FOR_TABLET);
        } else if (windowWidth <= screenResolutionConstants.mobile) {
            setCardsCount(cardsConstants.CARDS_COUNT_FOR_MOBILE);
        }
    };
    // Делаем debounced функцию чтобы подгружать карточки не чаще чем раз в 100 миллисекунд
    const debouncedResizeWindow = useDebouncedFunction(rezizeWindow, 200);

    // Вешаем событие на изменение размера окна
    useEffect(() => {
        debouncedResizeWindow();
        window.addEventListener('resize', debouncedResizeWindow);
        return () => {
            window.removeEventListener('resize', debouncedResizeWindow);
        }
    }, []);


    // Функция для подгрузки карточки в зависимости от размера окна
    const onShowMoreMovies = () => {
        if (location.pathname === "/movies") {
            const windowWidth = window.innerWidth;
            if (windowWidth >= screenResolutionConstants.tablet) {
                setCardsCount(cardsCount + cardsConstants.CARDS_COUNT_PAGINATION_DESKTOP);
            } else if (windowWidth <= screenResolutionConstants.tablet && windowWidth > screenResolutionConstants.mobile) {
                setCardsCount(cardsCount + cardsConstants.CARDS_COUNT_PAGINATION_TABLET);
            } else if (windowWidth <= screenResolutionConstants.mobile) {
                setCardsCount(cardsCount + cardsConstants.CARDS_COUNT_PAGINATION_MOBILE);
            }
        }
    }

    return (
        <section className='movies-card-list'>
            {isLoading ?
                <Preloader />
                : <>
                    {movies.length > cardsConstants.ZERO ?
                        location.pathname === "/movies"
                            ? <div className='movies-card-list__container'>
                                {movies.slice(cardsConstants.ZERO, cardsCount)
                                    .map((card) => <MoviesCard
                                        key={card.movieId}
                                        card={card}
                                        onSaveMovie={onSaveMovie}
                                        onDeleteMovie={onDeleteMovie}
                                        isSaved={isSavedMovie(savedMovies, card)}
                                        savedMovies={savedMovies}

                                    />)}
                            </div>
                            : <div className='movies-card-list__container movies-card-list__container_type_saved'>
                                {movies.slice(cardsConstants.ZERO, cardsCount)
                                    .map((card) => <MoviesCard
                                        key={card.movieId}
                                        card={card}
                                        onDeleteMovie={onDeleteMovie}
                                    />)}
                            </div>
                        :
                        <p className='movies-card-list__error'>
                            {isSuccess ? 'Ничего не найдено' : errorText}
                        </p>
                    }
                </>
            }
            {
                location.pathname === '/movies' && movies.length > cardsCount &&
                <div className='movies-card-list__button-container'>
                    <button onClick={onShowMoreMovies} className='movies-card-list__button' type='button'>
                        Еще
                    </button>
                </div>
            }


        </section>)
}

export default MoviesCardList;
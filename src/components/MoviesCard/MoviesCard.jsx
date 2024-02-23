import React from 'react'
import { useLocation } from 'react-router-dom'
import './MoviesCard.css'
import { MOVIES_API_URL } from '../../utils/urlConstants';
function MoviesCard({
    card,
    onSaveMovie,
    onDeleteMovie,
    isSaved
}) {
    const location = useLocation()


    const onToggleMovie = () => {
        if (isSaved) {
            onDeleteMovie(card)
        } else {
            onSaveMovie(card)
        }
    }

    return (
        <figure className='movies-card'>
            <figcaption className='movies-card__figcaption'>
                <div className='movies-card__info'>
                    <h5 className='movies-card__title'>{card.nameRU}</h5>
                    <p className='movies-card__duration'>
                        {`${(card.duration / 60 < 1) ?
                            ' '
                            : Math.floor((card.duration / 60)) + 'ч'} ${card.duration % 60}м`}

                    </p>
                </div>
                {location.pathname === '/movies' ?
                    <button
                        onClick={onToggleMovie}
                        className={`movies-card__button ${isSaved ?
                            'movies-card__button_type_active'
                            : 'movies-card__button_type_unactive'}`}
                        type='button'>
                    </button>
                    : location.pathname === '/saved-movies' &&
                    <button
                        type='button'
                        className='movies-card__button movies-card__button_type_delete'
                        onClick={() => onDeleteMovie(card)}
                    >
                    </button>}

            </figcaption>
            <a className='movies-card__link' href={card.trailerLink} target='_blank' rel='noreferrer'>
                <img className='movies-card__image'
                    src={location.pathname === '/saved-movies' ? card.image : `${MOVIES_API_URL}${card.image.url}`}
                    alt={`обложка фильма: ${card.nameRU}`}
                />
            </a>
        </figure>
    )
}

export default MoviesCard;
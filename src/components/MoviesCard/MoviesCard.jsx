import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './MoviesCard.css'
import Zatychka from '../../images/Zatychka.png'
function MoviesCard({ card }) {
    const [isAdded, setIsAdded] = useState(card.isSaved);
    const location = useLocation()
    const onMovieSave = () => {
        setIsAdded(true);
    }

    const onMovieDelete = () => {
        setIsAdded(false);
    }

    return (
        <figure className='movies-card'>
            <figcaption className='movies-card__figcaption'>
                <div>
                    <h5 className='movies-card__title'>{card.nameRU}</h5>
                    <p className='movies-card__duration'>
                        {`${(card.duration / 60 < 1) ?
                            ' '
                            : Math.floor((card.duration / 60)) + 'ч'} ${card.duration % 60}м`}

                    </p>
                </div>
                {location.pathname === '/movies' ?
                    <button onClick={isAdded ? onMovieDelete : onMovieSave} className={`movies-card__button ${isAdded ? 'movies-card__save-button_active' : 'movies-card__save-button_unactive'}`} type='button'>
                    </button>
                    : location.pathname === '/saved-movies' &&
                    <button type='button' className='movies-card__button movie-card__delete-button'>
                    </button>}

            </figcaption>
            <a className='movies-card__link' href={card.trailerLink} target='_blank' rel='noreferrer'>
                <img className='movies-card__image'
                    src={card.image ? card.image : Zatychka}
                    alt={`обложка фильма: ${card.nameRU}`}
                />
            </a>
        </figure>
    )
}

export default MoviesCard;
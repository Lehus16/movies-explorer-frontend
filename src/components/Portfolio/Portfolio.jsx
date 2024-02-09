import React from 'react'
import './Portfolio.css';
import arrowIcon from '../../images/arrowIcon.svg';

function Portfolio() {
    return (
        <div className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <a className="portfolio__link" target="_blank" rel="noopener noreferrer" href="https://github.com/Lehus16/how-to-learn">
                Статичный сайт
                <img className="portfolio__arrow" alt='Стрелка' src={arrowIcon} />
            </a>
            <a className="portfolio__link" target="_blank" rel="noopener noreferrer" href="https://github.com/Lehus16/RussainTravel.YandexPracticum">
                Адаптивный сайт
                <img className="portfolio__arrow" alt='Стрелка' src={arrowIcon} />
            </a>
            <a className="portfolio__link" target="_blank" rel="noopener noreferrer" href="https://github.com/Lehus16/react-mesto-api-full-gha">
                Одностраничное приложение
                <img className="portfolio__arrow" alt='Стрелка' src={arrowIcon} />
            </a>
        </div>
    )
}

export default Portfolio;
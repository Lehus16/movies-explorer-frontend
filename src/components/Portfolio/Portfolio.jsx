import React from 'react'
import './Portfolio.css';

function Portfolio() {
    return (
        <div className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <a className="portfolio__link" target="_blank" rel="noopener noreferrer" href="https://github.com/Lehus16/how-to-learn">
                Статичный сайт
                <p>&#129125;</p>
            </a>
            <a className="portfolio__link" target="_blank" rel="noopener noreferrer" href="https://github.com/Lehus16/RussainTravel.YandexPracticum">
                Адаптивный сайт
                <p>&#129125;</p>
            </a>
            <a className="portfolio__link" target="_blank" rel="noopener noreferrer" href="https://github.com/Lehus16/react-mesto-api-full-gha">
                Одностраничное приложение
                <p>&#129125;</p>
            </a>
        </div>
    )
}

export default Portfolio;
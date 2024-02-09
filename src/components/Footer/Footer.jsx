import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__wrapper">
                <h4 className="footer__title">
                    Учебный проект Яндекс.Практикум х BeatFilm.
                </h4>
                <div className="footer__flex-container">
                    <p className="footer__year">© 2024</p>
                    <div className="footer__container">
                        <a className="footer__link" href="https://practicum.yandex.ru">
                            Яндекс.Практикум
                        </a>
                        <a className="footer__link" href="https://github.com/Yandex-Practicum">
                            Github
                        </a>
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer
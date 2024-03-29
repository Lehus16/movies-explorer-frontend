import React from "react";
import WEB_logo from "../../images/text__COLOR_landing-logo.svg";
import './Promo.css';

const Promo = () => {
    return (
        <section className="promo">
            <div className="promo__about">
                <h1 className="promo__title">
                    Учебный проект студента факультета Веб-разработки.
                </h1>
                <p className="promo__subtitle">
                    Листайте ниже, чтобы узнать больше про этот проект и его создателя.
                </p>
                <a className="promo__link" href="#about-project">
                    Узнать больше
                </a>
            </div>
            <img className="promo__logo" src={WEB_logo} alt="Логотип" />
        </section>
    )
}

export default Promo;
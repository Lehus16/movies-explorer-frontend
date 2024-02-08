import React from "react";
import './Techs.css';

const Techs = () => {
    return (
        <section className="techs">
            <div className="techs__container">
                <h3 className="techs__subtitle">
                    Технологии
                </h3>
                <h2 className="techs__title">
                    7 технологий
                </h2>
                <p className="techs__paragraph">
                    На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="techs__list">
                    <li className="techs__text">
                        HTML
                    </li>
                    <li className="techs__text">
                        CSS
                    </li>
                    <li className="techs__text">
                        JS
                    </li>
                    <li className="techs__text">
                        React
                    </li>
                    <li className="techs__text">
                        Git
                    </li>
                    <li className="techs__text">
                        Express.js
                    </li>
                    <li className="techs__text">
                        mongoDB
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Techs;
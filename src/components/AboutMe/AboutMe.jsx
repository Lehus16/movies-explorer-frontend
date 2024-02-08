import React from "react";
import "./AboutMe.css";


function AboutMe() {
    return (
        <section className="about-me">
            <h3 className="about-me__subtitle">
                Студент
            </h3>
            <div className="about-me__flex-container">
                <div className="about-me__container">
                    <h2 className="about-me__title">
                        Алексей
                    </h2>
                    <p className="about-me__text">
                        Фронтенд-разработчик, 28 лет
                    </p>
                    <p className="about-me__paragraph">
                        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <a className="about-me__link" href="https://github.com/Lehus16" target="_blank" rel="noopener noreferrer">Github</a>
                </div>
                <div className="about-me__photo"></div>
            </div>
        </section>
    )
}

export default AboutMe
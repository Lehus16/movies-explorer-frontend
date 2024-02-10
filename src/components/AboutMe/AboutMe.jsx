import React from "react";
import "./AboutMe.css";
import myPhoto from '../../images/myPhoto.jpg'


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
                        Меня зовут Алексей, мне 28 лет, я родился в Москве. Люблю музыку и frontend. Закончил МГКИЭТ по специальности "Информационные технологии". Прошёл курс "Веб-разработчик" на Яндекс.Практикум. Работаю веб разработчиком и параллельно изучаю новые технологии.
                    </p>
                    <a className="about-me__link" href="https://github.com/Lehus16" target="_blank" rel="noopener noreferrer">Github</a>
                </div>
                <img className="about-me__image" src={myPhoto} alt="Алексей" />

            </div>
        </section>
    )
}

export default AboutMe
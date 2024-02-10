import React from "react";
import './AboutProject.css';

const AboutProject = () => {
    return (
        <section id="about-project" className="about-project">
            <h2 className="about-project__title">
                О проекте
            </h2>
            <div className="about-project__table">
                <h3 className="about-project__table-title">Дипломный проект включал 5 этапов</h3>
                <h3 className="about-project__table-title">На выполнение диплома ушло 5 недель</h3>
                <p className="about-project__table-paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <p className="about-project__table-paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className="about-project__milestones">
                <p className="about-project__milestone-title green-background">1 неделя</p>
                <p className="about-project__milestone-title grey-background">4 недели</p>
                <p className="about-project__milestone-paragraph">Back-end</p>
                <p className="about-project__milestone-paragraph">Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject;
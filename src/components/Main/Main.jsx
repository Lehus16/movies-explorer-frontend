import React from "react";
import './Main.css';
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
const Main = ({ loggedIn }) => {

    return (
        <>
            <Header loggedIn={loggedIn} />
            <main className="main">
                <div className="main__container">
                    <Promo />
                </div>
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </main>
            <Footer />
        </>

    );
}


export default Main;
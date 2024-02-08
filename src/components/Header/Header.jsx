import React, { useState } from "react";
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from "../Logo/Logo.jsx";
import profileLogo from "../../images/header_profile.svg";
import Navigation from "../Navigation/Navigation.jsx";
import burgerMenuIcon from "../../images/burgerMenuIcon.svg";

import './Header.css';

const Header = ({ loggedIn }) => {

    const location = useLocation();

    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
    const toggleBurgerMenu = () => {
        setIsBurgerMenuOpen(!isBurgerMenuOpen);
    }

    return (
        <header>
            {location.pathname === "/" ?
                (<div className="header header_path_main" >
                    {!loggedIn ?
                        (<div className="header__container header__unauth-container">
                            <Logo className={"header__logo"} />
                            <nav>
                                <Link to="/signup" className="header__sign-up-button_path_main">
                                    Регистрация
                                </Link>
                                <Link to="/signin" className="header__sign-in-button">
                                    Войти
                                </Link>
                            </nav>
                        </div>)
                        : (<div className="header__container header__auth-container">
                            <nav className="header__nav-container">
                                <Logo className={"header__logo"} />
                                <NavLink to="/movies" className="header__movies-button header__movies-button_path_main">
                                    Фильмы
                                </NavLink>
                                <NavLink to="/saved-movies" className="header__saved-movies-button header__saved-movies-button_path_main">
                                    Сохранённые фильмы
                                </NavLink>
                            </nav>
                            <Link to="/profile" className="header__profile-button">
                                <p className="header__profile-text header__profile-text_path_main">
                                    Аккаунт
                                </p>
                                <img src={profileLogo} alt="Логотип" className="header__profile-logo" />
                            </Link>
                            <button
                                className={`header__burger-button ${isBurgerMenuOpen && "header__burger-button_active"}`}
                                onClick={toggleBurgerMenu} type="button">
                                <img className="header__burger-icon" src={burgerMenuIcon} alt="Меню" />
                            </button>
                        </div>)
                    }

                </div>) :
                (<div className="header" >
                    {loggedIn ?
                        (<div className="header__container header__unauth-container">
                            <Logo className={"header__logo"} />
                            <nav>
                                <Link to="/signup" className="header__sign-up-button">
                                    Регистрация
                                </Link>
                                <Link to="/signin" className="header__sign-in-button">
                                    Войти
                                </Link>
                            </nav>
                        </div>)
                        : (<div className="header__container header__auth-container">
                            <nav className="header__nav-container">
                                <Logo className={"header__logo"} />
                                <NavLink to="/movies" className={`header__movies-button ${location.pathname === '/movies' && "header__movies-button_path_movies"}`}>
                                    Фильмы
                                </NavLink>
                                <NavLink to="/saved-movies" className={`header__saved-movies-button
                                ${location.pathname === '/saved-movies' && "header__saved-movies-button_path_saved-movies"}`}>
                                    Сохранённые фильмы
                                </NavLink>
                            </nav>
                            <Link to="/profile" className="header__profile-button">
                                <p className="header__profile-text">
                                    Аккаунт
                                </p>
                                <img src={profileLogo} alt="Логотип" className="header__profile-logo" />
                            </Link>
                            <button
                                className={`header__burger-button ${isBurgerMenuOpen && "header__burger-button_active"}`}
                                onClick={toggleBurgerMenu} type="button">
                                <img className="header__burger-icon" src={burgerMenuIcon} alt="Меню" />
                            </button>
                        </div>)
                    }

                </div>)
            }
            <Navigation
                isBurgerMenuOpen={isBurgerMenuOpen}
                setIsBurgerMenuOpen={setIsBurgerMenuOpen}
            />
        </header>

    )
}

export default Header;
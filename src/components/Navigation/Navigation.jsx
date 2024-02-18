import React from 'react'
import './Navigation.css';
import { Link } from 'react-router-dom';
import profileLogoGrey from '../../images/profileLogoGrey.svg';
import burgerMenuCloseIcon from '../../images/burgerMenuCloseIcon.svg';

function Navigation({ isBurgerMenuOpen, toggleBurgerMenu }) {
    return (
        <div className={`navigation-overlay ${isBurgerMenuOpen ?
            "navigation-overlay_type_visible"
            : "navigation-overlay_type_hidden"}`}>
            <div className={`navigation ${isBurgerMenuOpen && "navigation_active"} `}>
                <button className='navigation__close-button-container'>
                    <img src={burgerMenuCloseIcon} alt="Кнопка закрытия бургер меню"
                        onClick={() => { toggleBurgerMenu() }} className='navigation__close-button' />
                </button>
                <div className='navigation__container'>
                    <div className='navigation__links'>
                        <Link
                            onClick={() => {
                                toggleBurgerMenu()
                            }}
                            className='navigation__link' to="/">
                            Главная</Link>
                        <Link
                            onClick={() => {
                                toggleBurgerMenu()
                            }}
                            className='navigation__link'
                            to="/movies">
                            Фильмы</Link>
                        <Link
                            onClick={() => {
                                toggleBurgerMenu()
                            }}
                            className='navigation__link'
                            to="/saved-movies">
                            Сохранённые фильмы</Link>
                    </div>
                    <Link
                        onClick={() => {
                            toggleBurgerMenu()
                        }}
                        className='navigation__profile-link'
                        to="/profile">
                        <p
                            className='navigation__profile-link-text'>
                            Аккаунт
                        </p>
                        <img
                            className='navigation__profile-link-logo'
                            src={profileLogoGrey}
                            alt="Логотип" />
                    </Link>
                </div>
            </div>
        </div>


    )
}

export default Navigation;
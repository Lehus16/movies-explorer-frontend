import React from 'react'
import './Navigation.css';
import { Link } from 'react-router-dom';
import profileLogoGrey from '../../images/profileLogoGrey.svg';
import burgerMenuCloseIcon from '../../images/burgerMenuCloseIcon.svg';

function Navigation({ isBurgerMenuOpen, setIsBurgerMenuOpen }) {
    return (
        <>
            <div className={`navigation ${isBurgerMenuOpen && "navigation_active"} `}>
                <button>
                    <img src={burgerMenuCloseIcon} alt="Кнопка закрытия бургер меню" onClick={() => setIsBurgerMenuOpen(false)} className='navigation__close-button' />
                </button>
                <div className='navigation__container'>
                    <div className='navigation__links'>
                        <Link onClick={() => setIsBurgerMenuOpen(false)} className='navigation__link' to="/">Главная</Link>
                        <Link className='navigation__link' to="/movies">Фильмы</Link>
                        <Link className='navigation__link' to="/saved-movies">Сохранённые фильмы</Link>
                    </div>
                    <Link className='navigation__profile-link' to="/profile">
                        <p className='navigation__profile-link-text'>Аккаунт</p>
                        <img className='navigation__profile-link-logo' src={profileLogoGrey} alt="Логотип" />
                    </Link>
                </div>
            </div></>


    )
}

export default Navigation;
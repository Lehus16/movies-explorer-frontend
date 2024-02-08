import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

const Logo = ({ className }) => {
    return (
        <Link to="/" className='logo' >
            <img src={logo} alt="Логотип" className={className} />
        </Link>
    )
}

export default Logo;
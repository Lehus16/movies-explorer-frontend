import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import './FilterCheckbox.css'
function FilterCheckbox({ onCheckboxChange, isLoading, savedMoviesCheckbox, setSavedMoviesCheckbox }) {


    const location = useLocation();
    const [checkboxChecked, setCheckboxChecked] = useState(() => {
        if (location.pathname === '/movies') {
            return localStorage.getItem('shortMoviesCheckbox') === "true";
        }
        return false;
    });


    const checkboxToggle = () => {
        if (location.pathname === '/movies') {
            setCheckboxChecked(!checkboxChecked);
            onCheckboxChange(!checkboxChecked);
        } else if (location.pathname === '/saved-movies') {
            setSavedMoviesCheckbox(!savedMoviesCheckbox);
            onCheckboxChange(!savedMoviesCheckbox);
        }
    }


    return (
        <div className='filter-checkbox'>
            <label className='filter-checkbox__switch'>
                <input
                    onChange={checkboxToggle}
                    checked={location.pathname === '/saved-movies' ? savedMoviesCheckbox : checkboxChecked}
                    className='filter-checkbox__input'
                    type='checkbox'
                    disabled={isLoading}
                />
                <span className='filter-checkbox__slider'></span>
            </label>
            <p className='filter-checkbox__text'>Короткометражки</p>
        </div>
    )
}

export default FilterCheckbox